declare global {
  namespace Express {
    interface Request {
      user?: {
        user: {
          id: string;
          userName: string;
          email: string;
          password: string;
          created_at: string;
          updated_at: string;
        };
      };
    }
  }
}

export {};