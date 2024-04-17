import {Text, View, Image} from 'react-native';

export default function ForecastDays() {

    return (
        <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
         style={{backgroundColor:theme.bgDark(.25)}}
         key={index}>
            <Image source={require('../../assets/images/heavyrain.png')} className="w-11 h-11"/>
            <Text className='text-black'>Monday</Text>
            <Text className='text-black'>23 &#176;</Text>
        </View>
    )

}
