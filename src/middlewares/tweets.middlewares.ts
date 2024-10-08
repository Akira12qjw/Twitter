import { checkSchema } from "express-validator";
import { isEmpty } from "lodash";
import { ObjectId } from "mongodb";
import { MediaType, TweetAudience, TweetType } from "~/constants/enums";
import { TWEETS_MESSAGES } from "~/constants/messages";
import { numberEnumToArray } from "~/utils/commons";
import { validate } from "~/utils/validation";

const tweetTypes = numberEnumToArray(TweetType);
const tweetAudiences = numberEnumToArray(TweetAudience);
const mediaTypes = numberEnumToArray(MediaType);

export const createTweetValidator = validate(
  checkSchema({
    type: {
      isIn: {
        options: [tweetTypes],
        errorMessage: TWEETS_MESSAGES.INVALID_TYPE,
      },
    },
    audience: {
      isIn: {
        options: [tweetAudiences],
        errorMessage: TWEETS_MESSAGES.INVALID_AUDIENCE,
      },
    },
    parent_id: {
      custom: {
        options: (value, { req }) => {
          const type = req.type as TweetType;
          if (
            [
              TweetType.Retweet,
              TweetType.Comment,
              TweetType.QuoteTweet,
            ].includes(type) &&
            !ObjectId.isValid(value)
          ) {
            throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_A_VALID_TWEET_ID);
          }
          if (type === TweetType.Tweet && value !== null) {
            throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_NULL);
          }
          return true;
        },
      },
    },
    content: {
      isString: true,
      custom: {
        options: (value, { req }) => {
          const type = req.type as TweetType;
          const hashtags = req.body.hashtags as string[];
          const mentions = req.body.mentions as string[];
          if (
            [TweetType.Comment, TweetType.QuoteTweet, TweetType.Tweet].includes(
              type
            ) &&
            isEmpty(hashtags) &&
            isEmpty(mentions) &&
            value === ""
          ) {
            throw new Error(TWEETS_MESSAGES.CONTENT_MUST_BE_A_NON_EMPTY_STRING);
          }
          if (type === TweetType.Retweet && value !== "") {
            throw new Error(TWEETS_MESSAGES.CONTENT_MUST_BE_EMPTY_STRING);
          }
          return true;
        },
      },
    },
    hashTags: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          if (value.some((item: any) => typeof item !== "string")) {
            throw new Error(
              TWEETS_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING
            );
          }
          return true;
        },
      },
    },
    mentions: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          if (value.some((item: any) => !ObjectId.isValid(item))) {
            throw new Error(
              TWEETS_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID
            );
          }
          return true;
        },
      },
    },
    medias: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          if (
            value.some((item: any) => {
              return (
                typeof item.url !== "string" || !mediaTypes.includes(item.type)
              );
            })
          ) {
            throw new Error(
              TWEETS_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID
            );
          }
          return true;
        },
      },
    },
  })
);
