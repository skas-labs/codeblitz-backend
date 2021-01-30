import { AbstractRepository, EntityRepository } from 'typeorm';
import { OTP } from '../entities/otp.entity';

class OtpValidationError extends Error {

  static InvalidNonceError = class extends OtpValidationError {
    message = 'INVALID_NONCE';
  };
  static WrongPhNoError = class extends OtpValidationError {
    message = 'PH_NO_WRONG';
  };
  static OTPMismatchError = class extends OtpValidationError {
    message = 'OTP_MISMATCH';
  };
}


@EntityRepository(OTP)
export class OtpRepository extends AbstractRepository<OTP> {

  async genNewOtp(phno: string): Promise<OTP> {
    const otp = this.repository.save({
      createdAt: Date.now(),
      deletedAt: Date.now() + 1000 * 60 * 10, // 10 min
      otp: parseInt(String((Math.random() * 1000000))).toString()
    });

    return otp;
  }

  async verifyOtp(phno: string, nonce: string, otp: string): Promise<boolean> {

    const existing = await this.repository.findOne(nonce);
    if (!existing) throw new OtpValidationError.InvalidNonceError();

    if (phno !== existing.phno) throw new OtpValidationError.WrongPhNoError();

    if (otp !== existing.otp) throw new OtpValidationError.OTPMismatchError()

    return true

  }
}