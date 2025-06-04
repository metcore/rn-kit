# BottomSheet

This component using modal React Native
## Usage

```js
import { BottomSheet, Typography, Container } from '@herca/ui-kit';
import {useState} from 'react';
import {View} from 'react-native';
export default function BottomSheetScreen(){
  const [isOpen, setIsOpen] = useState()
    return(
      <View>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Container>
            <Typohraphy> Hello World</Typography>
          </Container>
        </BottomSheet>
        <Button title="Open Modal" onPress={()=>setIsOpen(true)} />
      </View>
    )
}
```

## Props

| props name           | mandatory | types   | default                                                  |
| -------------------- | --------- | ------- | -------------------------------------------------------- |
| isOpen             |          | boolean | false                                            |
| onClose              |         | func    |                                               |
| children       |           | React.Node  |        |
| backdrop              |         | boolean    |  true                                             |
| closable              |         | boolean    |  true                                             |
| onRequestClose              |         | func    |                                               |
| footer              |         | func    |                                               |