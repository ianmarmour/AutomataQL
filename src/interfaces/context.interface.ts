import AWS from "aws-sdk";

export interface Context {
  database: AWS.DynamoDB;
}
