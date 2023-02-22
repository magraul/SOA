import { sign } from 'jsonwebtoken';

class RefreshToken {
  id: string;
  userId: string;
  userAgent: string;
  ipAddress: string;

  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}

export default RefreshToken;
