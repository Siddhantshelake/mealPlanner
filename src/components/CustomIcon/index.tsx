import React from 'react';
import {Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

interface IconProps {
  type?: 'material' | 'material-community' | 'font-awesome' | 'ionicons';
  name: string;
  size: number;
  color: string;
}

const CustomIcon: React.FC<IconProps> = ({
  type = 'material-community',
  name,
  size,
  color,
}) => {
  switch (type) {
    case 'material':
      return <MaterialIcon name={name} size={size} color={color} />;
    case 'material-community':
      return <MaterialCommunityIcon name={name} size={size} color={color} />;
    case 'font-awesome':
      return <FontAwesomeIcon name={name} size={size} color={color} />;
    case 'ionicons':
      return <IoniconsIcon name={name} size={size} color={color} />;
    default:
      return <Text style={{color, fontSize: size}}>⬤</Text>;
  }
};

export default CustomIcon;
