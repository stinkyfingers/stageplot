terraform {
    backend "s3" {
      bucket = "remotebackend"
      key    = "stageplot/terraform.tfstate"
      region = "us-west-1"
      profile = "jds"
    }
  }
