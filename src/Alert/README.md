# Alert

## Usage

```js
import { Alert } from '@herca/ui-kit';

export default function AlertScreen(){
    return(
      <Alert
        title="Warning"
        message="Hello everybody, im here."
        color="warning"
      />
    )
}
<Button />
```

## Props

| props name           | mandatory | types   | default                                                  |
| -------------------- | --------- | ------- | -------------------------------------------------------- |
| icon             |          | string | ExlamationMark                                            |
| title              |         | title    | null                                              |
| message       |           | string  | null       |
| color          |           | string  | primary       |
