# Molecular Parser

Api available [here](https://w0jyxqe4x0.execute-api.us-east-2.amazonaws.com/Prod).

## Structure

|             path              | description |
| ----------------------------- | ----------- |
| `buildspec.yml`               | used by AWS CodeBuild to package your service for deployment to AWS Lambda |
| `src/`                        | node source code |
| `index.js`                    | AWS Lambda handler code |
| `template.yml`                | AWS Serverless Application Model (AWS SAM) used by AWS CloudFormation to deploy your service to AWS Lambda and Amazon API Gateway. |
| `template-configuration.json` | the project ARN with placeholders used for tagging resources with the project ID |
