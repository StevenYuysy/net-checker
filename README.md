## how to use

1. install package globally `npm install net-checker -g`

2. a url text list, for example

```
https://www.github.com
https://www.bing.com
https://www.google.com
```

3. exec the command `net-checker check path/to/your/url-text`

4. get the result

```
┌────────────────────────┬────────┐
│ url                    │ status │
├────────────────────────┼────────┤
│ https://www.github.com │ ✅     │
├────────────────────────┼────────┤
│ https://www.bing.com   │ ✅     │
├────────────────────────┼────────┤
│ https://www.google.com │ ❌     │
└────────────────────────┴────────┘
```

## documentation

### possible result

1. success
2. failed (timeout or error)

### options

#### environments

- DEBUG=net-checker: get verbose output
- CONNECTION_TIMEOUT=10000: change connection timeout

## contribution

```bash
yarn
```
