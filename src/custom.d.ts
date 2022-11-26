declare namespace Express {
  export interface Request {
    user?: {
      userid?: number | null;
      name: string;
      email: string;
      password: string;
      otp?: number | null;
      role: String;
    };
    product?: {
      files?: any[];
      name: string;
    };
  }
}
