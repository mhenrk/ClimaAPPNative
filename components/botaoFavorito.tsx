import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BotaoFavorito = () => {
  const [favorito, setFavorito] = useState(false);

  return (
    <View
      style={{
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: 1,
      }}
    >
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setFavorito(!favorito)}
      >
        <Icon
          name={favorito ? 'star' : 'star-border'}
          size={30}
          color={favorito ? '#FFD700' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BotaoFavorito;
