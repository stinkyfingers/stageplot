variable "profile" {
  type = string
  default = "jds"
}

variable "region" {
  type = string
  default = "us-west-1"
}

variable "project" {
  type = string
}

variable "domain" {
  type = string
  default = "john-shenk.com"
}

variable "zone_id" {
  type = string
  default = "Z3P68RXJ4VECYX"
}

variable "certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:671958020402:certificate/fc7ab094-b641-4898-8aca-24739e555f73"
}
