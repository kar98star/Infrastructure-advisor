async function generateArchitecture(requirement) {
  const text = requirement.toLowerCase();

  if (text.includes("food")) {
    return {
      architecture: [
        "API Gateway",
        "Lambda",
        "DynamoDB",
        "S3",
        "SNS",
        "CloudWatch",
      ],

      security: [
        "IAM Roles",
        "MFA",
        "Encrypt S3 Buckets",
      ],

      bestPractices: [
  "Enable CloudTrail logging",
  "Enable KMS encryption",
  "Use least-privilege IAM roles",
  "Enable CloudWatch alarms",
  "Configure Auto Scaling",
],

      reasoning: [
        "API Gateway handles incoming client requests.",
        "Lambda runs backend logic without managing servers.",
        "DynamoDB stores orders and user information.",
        "S3 stores images and static assets.",
        "SNS sends notifications to customers.",
        "CloudWatch monitors logs and system health.",
      ],

      costBreakdown: {
        "API Gateway": 10,
        "Lambda": 15,
        "DynamoDB": 20,
        "S3": 5,
        "SNS": 3,
        "CloudWatch": 7,
      },

      estimatedCost: "$60/month",

      terraform: `
resource "aws_api_gateway_rest_api" "food_api" {
  name = "food-api"
}

resource "aws_lambda_function" "food_lambda" {
  function_name = "food-lambda"
}

resource "aws_dynamodb_table" "orders" {
  name         = "orders"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }
}

resource "aws_s3_bucket" "food_assets" {
  bucket = "food-assets-bucket"
}
`,

      requirement,
    };
  }

  if (text.includes("chat")) {
    return {
      architecture: [
        "WebSocket API",
        "Lambda",
        "DynamoDB",
        "ElastiCache",
        "CloudWatch",
      ],

      security: [
        "IAM",
        "Rate Limiting",
        "Encryption",
      ],
      bestPractices: [
  "Enable WebSocket throttling",
  "Enable CloudWatch monitoring",
  "Encrypt messages at rest",
  "Use IAM least privilege",
  "Enable backup strategy",
],

      reasoning: [
        "WebSocket API enables real-time messaging.",
        "Lambda processes chat events without managing servers.",
        "DynamoDB stores user and message metadata.",
        "ElastiCache reduces latency for active conversations.",
        "CloudWatch monitors application performance and logs.",
      ],

      costBreakdown: {
        "WebSocket API": 12,
        "Lambda": 20,
        "DynamoDB": 15,
        "ElastiCache": 25,
        "CloudWatch": 8,
      },

      estimatedCost: "$80/month",

      terraform: `
resource "aws_apigatewayv2_api" "chat_api" {
  name          = "chat-api"
  protocol_type = "WEBSOCKET"
}

resource "aws_lambda_function" "chat_lambda" {
  function_name = "chat-lambda"
}

resource "aws_dynamodb_table" "messages" {
  name         = "messages"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "messageId"

  attribute {
    name = "messageId"
    type = "S"
  }
}
`,

      requirement,
    };
  }

  if (
    text.includes("ecommerce") ||
    text.includes("e-commerce")
  ) {
    return {
      architecture: [
        "ALB",
        "EC2",
        "RDS",
        "S3",
        "CloudFront",
        "WAF",
      ],

      security: [
        "WAF",
        "IAM",
        "SSL/TLS",
      ],

      bestPractices: [
  "Enable Multi-AZ deployment",
  "Use AWS WAF",
  "Enable CloudTrail",
  "Enable Auto Scaling",
  "Encrypt RDS data",
],

      reasoning: [
        "ALB distributes incoming traffic across servers.",
        "EC2 hosts the application backend.",
        "RDS stores transactional business data.",
        "S3 stores product images and static files.",
        "CloudFront improves global content delivery.",
        "WAF protects the application from web attacks.",
      ],

      costBreakdown: {
        "ALB": 20,
        "EC2": 40,
        "RDS": 35,
        "S3": 10,
        "CloudFront": 15,
        "WAF": 10,
      },

      estimatedCost: "$130/month",

      terraform: `
resource "aws_lb" "ecommerce_alb" {
  name               = "ecommerce-alb"
  load_balancer_type = "application"
}

resource "aws_instance" "web_server" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}

resource "aws_db_instance" "ecommerce_db" {
  allocated_storage = 20
  engine            = "mysql"
  instance_class    = "db.t3.micro"
}
`,

      requirement,
    };
  }

  return {
    architecture: [
      "API Gateway",
      "Lambda",
      "DynamoDB",
    ],

    security: [
      "IAM",
      "MFA",
    ],

    reasoning: [
      "API Gateway manages incoming requests.",
      "Lambda runs backend logic.",
      "DynamoDB stores application data.",
    ],

    costBreakdown: {
      "API Gateway": 10,
      "Lambda": 10,
      "DynamoDB": 10,
    },

    estimatedCost: "$30/month",

    terraform: `
resource "aws_api_gateway_rest_api" "api" {
  name = "default-api"
}

resource "aws_lambda_function" "lambda" {
  function_name = "default-lambda"
}
`,

    requirement,
  };
}

module.exports = {
  generateArchitecture,
};