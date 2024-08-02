import { IResponse, StoreData } from "../../interface/services/Iresponse";
import { IUser } from '../../../domainLayer/user';
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import ErrorResponse from "../../handler/errorResponse";
import { StatusCodes } from "../../../utils/statusCodes"


export const profileImageUpdate = async (
  userRepository: IUserRepository,
  s3service: Is3bucket,
  s3: S3Client,
  image: Express.Multer.File | undefined,
  id: string,
  email: string
): Promise<IResponse> => {
  try {
    if (!image) {
      throw ErrorResponse.internalError('No image provided');
    }

    // Update the profile image in S3
    const nameReturn = await s3service.profileImageUpdate(s3, image, id);
    if (!nameReturn) {
      throw ErrorResponse.internalError('Failed to update image in S3');
    }

    // Find the user
    const user = await userRepository.findUser(email);
    if (!user || !user._id) {
      throw ErrorResponse.badRequest('User does not exist');
    }

    // Build the user profile URL
    const userId = user._id.toString();
    let url: string = '';
    if (user.profileImage) {
      url = await s3service.getImages(s3, userId);
    }

    // Prepare response data
    const responseData: StoreData = {
      _id: user._id,
      name: user.first_name,
      email: user.email as string,
      profileImg: url
    };

    // Update the user's profile image in the database
    const response = await userRepository.uploadProfileImage(nameReturn, id);
    if (!response) {
      throw ErrorResponse.internalError('Failed to update user profile image');
    }

    return {
      status: StatusCodes.OK,
      success: true,
      message: 'Profile updated successfully',
      data: responseData
    };
    
  } catch (error) {
    // Ensure the error is properly thrown and handled
    if (error instanceof ErrorResponse) {
      throw error;
    } else {
      throw ErrorResponse.internalError('An unexpected error occurred');
    }
  }
};
