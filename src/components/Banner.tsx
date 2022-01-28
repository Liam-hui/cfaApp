import * as React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

import { Text } from './Themed';

export default function Banner({ image, title, subTitle }: { image: ImageSourcePropType; title: string, subTitle?: string }) {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Image
        style={{ width: "100%", height: "100%", position: "absolute" }}
        source={image}
        resizeMode='cover'
      />
      <Text style={{ marginVertical: 40, color: "white", fontSize: 18, fontWeight: "700" }}>{title}</Text>
    </View>
  );
}

