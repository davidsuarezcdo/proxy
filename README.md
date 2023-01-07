# How to use

```bash
yarn start:proxy
```

# How to config file

```jsonc
{
  "my-custom-domain-proxy.staging": {
    "port": 4001,
    "host": "localhost" // optional, default is 127.0.0.1
  }
}
```

# NPM config

`cat ~/.npmrc`

```

proxy=http://127.0.0.1:27000/
noproxy=https://registry.*.*/*

```

commands:

```

npm config set proxy http://127.0.0.1:27000/
npm config set no_proxy https://registry.*.*/*

```

# Yarn config ~/.yarnrc

`cat ~/.yarnrc`

```

proxy ""

```

commands:

```

yarn config set proxy ''

```

Yarn does not support no_proxy, so you need to use the proxy setting to bypass the proxy.
