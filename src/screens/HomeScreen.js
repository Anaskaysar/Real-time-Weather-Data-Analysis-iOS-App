import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { theme } from '../theme';
import {CalendarDaysIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon} from 'react-native-heroicons/solid'
import { useCallback, useState } from 'react';
import {debounce} from 'lodash'
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';

export default function HomeScreen() {

    const [showSearch,toggleSearch]=useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    
    const handleLocation = (loc) =>{
        // console.log('Location',loc)
        setLocations([]);
        toggleSearch(false)
        fetchWeatherForecast({
            cityName:loc.name,
            days:'7'
        }).then(data =>{
            setWeather(data)
            // console.log('Got Forecast',data)
        })
    }

    const handleSearch = value =>{
        // console.log('Value',value)
        //fetch locations
        if(value.length>2){
            fetchLocations({cityName:value}).then(data=>{
                setLocations(data);
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200),[])
    const {current,location} = weather;

    // console.log(current?.condition?.icon);
    // console.log(weather);


  return (

    <View className='flex-1 relative' >
        <StatusBar style="light" />
        <Image
            blurRadius={70}  source={require('../../assets/images/4.png')} className='absolute h-full w-full'
        />
        <SafeAreaView className='flex flex-1'>
            <View style={{height: '7%'}} className='mx-4 relative z-50'>
                <View className='flex-row justify-end items-center rounded-full' 
                 style={{backgroundColor:showSearch?theme.bgWhite(0.2):'transparent'}}>
                   {
                     showSearch?(
                        <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder="Search City"
                        placeholderTextColor={'lightgray'}
                        className='pl-6 h-10 flex-1 text-base text-white'
                    />          
                     ):null
                   }
                    <TouchableOpacity 
                    onPress={()=>{
                        toggleSearch(!showSearch)
                    }}
                    style={{backgroundColor:theme.bgWhite(0.3)}}
                    className='rounded-full p-3 m-1'>
                        <MagnifyingGlassIcon size={25} color={'white'}/>
                    </TouchableOpacity>                                      
                </View> 

                {/* Search Results  */}
                {
                    locations.length>0 && showSearch?(
                        <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                            {
                                locations.map((loc,index)=>{
                                    
                                    return (
                                        <TouchableOpacity
                                        onPress={()=>handleLocation(loc)}
                                        key={index}
                                        className={'flex-row items-center border-0 p-3 px-4 mb-1 border-b-2 border-b-gray-400'}
                                        >   
                                            <MapPinIcon size='20' color='gray'></MapPinIcon>
                                            <Text className="text-black text-lg ml-2"> {loc?.name}, {loc?.region}, {loc?.country} </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View>
                    ):null
                }              
            </View>

            {/* Forcast Section */}
            <View className="mx-4 flex justify-around flex-1 mb-2">
                <Text className="text-white text-center text-2xl font-bold"> {location?.name}
                    <Text className="text-;g font-semibold text-gray-300">
                        {" " + location?.region}, {location?.country}
                    </Text>
                </Text>
                {/* Weather Image  */} 
                <View className="flex-row justify-center">
                    <Image source={{uri:'https:'+current?.condition?.icon}}
                    className="w-52 h-52"></Image>
                    {/* <Image source={weatherImages[current?.condition?.text]} className="w-52 h-52"/> */}

                </View>
                {/* Temperature in Celcius  */}
                <View className="space-y-2">
                    <Text className="text-center font-bold text-white text-6xl ml-5"> {current?.temp_c} &#176;</Text>
                    <Text className="text-center text-white text-3xl tracking-widest"> {current?.condition?.text} </Text>
                </View>
                {/* Other Stats  */}

                <View className="flex-row justify-between mx-4">
                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../assets/icons/windBlack.png')} className="w-6 h-6"/>
                        <Text className= "text-black font-semibold text-base">{current?.wind_kph} kph</Text>
                    </View>
                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../assets/icons/blackDrop.png')} className="w-6 h-6"/>
                        <Text className= "text-black font-semibold text-base">{current?.humidity}%</Text>
                    </View>


                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../assets/icons/sunBlack.png')} className="w-6 h-6"/>
                        <Text className= "text-black font-semibold text-base">6:05 AM</Text>
                    </View>
                </View>           
            </View>
            
            {/* Weekly Forcast Section  */}
            <View className='mb-2 space-y-3'>
                <View className='flex-row items-center mx-5 space-x-2'>
                    <CalendarDaysIcon size='20' color='black'/>
                    <Text className='text-black text-base'>Daily Forcast</Text>
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={{paddingHorizontal:15}}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        weather?.forecast?.forecastday?.map((item,index) => {

                            let date = new Date(item.date);
                            let options = {weekday: 'long'};
                            let dayName = date.toLocaleDateString('en-us',options)
                            dayName = dayName.split(',')[0]
                            return (
                                <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                                 style={{backgroundColor:theme.bgDark(.25)}}
                                 key={index}>
                                    
                                    <Image source={{uri:'https:'+item?.day?.condition?.icon}} className="w-11 h-11"/>
                                    {/* <Image source={weatherImages[item?.day?.condition?.text]} className="w-11 h-11"/> */}
                                    <Text className='text-black'>{dayName}</Text>
                                    <Text className='text-black'>{item?.day?.avgtemp_c}&#176;</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View className="ml-4">
                <Text> Functionality Yet To Come Here</Text>
            </View>

        </SafeAreaView>
    </View>

    
  );
}
