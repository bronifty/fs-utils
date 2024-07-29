# S3 Bucket Website Protected and Cached With Cloudfront CDN and Route 53 DNS

:::tip{title="Synopsis:"}

We will start with Route 53 and Certificate Manager to handle domain control with SSL/TLS certificates and then set up the bucket as an origin for a cloudfront distribution which will serve traffic back through DNS.

:::

This is what our system architecture will look like:

![system-architecture](./system-architecture.png)

## Route 53

Create a hosted zone for your apex domain and point your domain registrar's nameservers to Route 53.

![route53](./route-53-name-servers.png)

![namecheap](./namecheap.png)

## Certificate Manager

Request a public certificate for your apex and wildcard subdomain with DNS validation and RSA 2048. Then create records in Route 53 for the validation.

![certificate-manager](./certificate-manager.png)

![route53-validation](./route-53-validation.png)

## Cloudfront Distribution

- oac, cnames cert and default root object to index.html

## S3 Bucket

- policy pointing to cloudfront distribution

```json
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bronifty.xyz/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::851725517932:distribution/E2UEHC2IRROLN2"
        }
      }
    }
  ]
}
```

You can add Front Matter at the beginning of your Markdown file, which is a YAML-formatted object that defines some metadata. For example:

```yaml
---
title: Hello World
---
```

> Note: By default, Rspress uses h1 headings as html headings.

You can also access properties defined in Front Matter in the body, for example:

```markdown
---
title: Hello World
---

# {frontmatter.title}
```

The previously defined properties will be passed to the component as `frontmatter` properties. So the final output will be:

```html
<h1>Hello World</h1>
```

## Custom Container

You can use the `:::` syntax to create custom containers and support custom titles. For example:

**Input:**

```markdown
:::tip
This is a `block` of type `tip`
:::

:::info
This is a `block` of type `info`
:::

:::warning
This is a `block` of type `warning`
:::

:::danger
This is a `block` of type `danger`
:::

::: details
This is a `block` of type `details`
:::

:::tip Custom Title
This is a `block` of `Custom Title`
:::

:::tip{title="Custom Title"}
This is a `block` of `Custom Title`
:::
```

**Output:**

:::tip
This is a `block` of type `tip`
:::

:::info
This is a `block` of type `info`
:::

:::warning
This is a `block` of type `warning`
:::

:::danger
This is a `block` of type `danger`
:::

::: details
This is a `block` of type `details`
:::

:::tip Custom Title
This is a `block` of `Custom Title`
:::

:::tip{title="Custom Title"}
This is a `block` of `Custom Title`
:::

## Code Block

### Basic Usage

You can use the \`\`\` syntax to create code blocks and support custom titles. For example:

**Input:**

````md
```js
console.log('Hello World');
```

```js title="hello.js"
console.log('Hello World');
```
````

**Output:**

```js
console.log('Hello World');
```

```js title="hello.js"
console.log('Hello World');
```

### Show Line Numbers

If you want to display line numbers, you can enable the `showLineNumbers` option in the config file:

```ts title="rspress.config.ts"
export default {
  // ...
  markdown: {
    showLineNumbers: true,
  },
};
```

### Wrap Code

If you want to wrap long code line by default, you can enable the `defaultWrapCode` option in the config file:

```ts title="rspress.config.ts"
export default {
  // ...
  markdown: {
    defaultWrapCode: true,
  },
};
```

### Line Highlighting

You can also apply line highlighting and code block title at the same time, for example:

**Input:**

````md
```js title="hello.js" {1,3-5}
console.log('Hello World');

const a = 1;

console.log(a);

const b = 2;

console.log(b);
```
````

**Ouput:**

```js title="hello.js" {1,3-5}
console.log('Hello World');

const a = 1;

console.log(a);

const b = 2;

console.log(b);
```

## Rustify MDX compiler

You can enable Rustify MDX compiler by following config:
