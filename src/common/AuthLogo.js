import React from 'react';
import { View, Image} from 'react-native';

import Landingimage from '../../assets/icons/logo'

const  LogoComponent = () => (

    <View>
       
       <Image
          source={Landingimage}
          resizeMode={'center'}
          style={{ 
             width:200,
             height:90,
             

          }}
>
       </Image> 

    </View>


)

export default LogoComponent;
