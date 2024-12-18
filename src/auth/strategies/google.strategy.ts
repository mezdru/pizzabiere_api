import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get("NEST_GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("NEST_GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get("NEST_GOOGLE_CALLBACK_URL"),
      scope: ["profile", "email"],
    });
  }

  // authorizationParams() {
  //   return {
  //     access_type: 'offline',
  //     prompt: 'consent',
  //   };
  // }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails } = profile;

    const user = {
      // provider: 'google',
      // providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    done(null, user);
  }
}
