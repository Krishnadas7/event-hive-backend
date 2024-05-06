interface INodemailer {
    generateOTP(email: string): string;
    sendEmailVerification(first_name: string, username: string): Promise<string>;
    sendMessageToEmail(email: string, first_name: string,status:string): Promise<string>;
    verifyEmail(enteredOTP: string, email: string): Promise<boolean>;
  }
  
  export default INodemailer;