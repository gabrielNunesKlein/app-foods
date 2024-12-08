import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'

import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset
} from 'react-native-reanimated';

export interface FoodsProps {
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string;
}

export interface RestaurantsProps {
    id: string;
    name: string;
    image: string;
}

import { useRouter, useLocalSearchParams } from 'expo-router';
import { TrendingFood } from '../components/trading';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

export default function Details() {

    const [restaurant, setRestaurant] = useState<RestaurantsProps | undefined>(undefined)

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

    const router = useRouter();

    const food = useLocalSearchParams() as unknown as FoodsProps;

    useEffect(() => {

        console.log("RESTAURANT ID >>> ", food.restaurantId)

        async function getRestaurant() {
            const response = await fetch(`http://192.168.0.27:3000/restaurants/${food.restaurantId}`)
            const data = await response.json()
            console.log("RESTAURNT >>> ", data)
            setRestaurant(data)
        }

        getRestaurant()

    }, [])

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
					)
				},
				{
					scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
				}
			]
		};
	});

    const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
		};
	});

    return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerLeft: () => <Text>Back</Text>,
					headerBackground: () => <Animated.View style={[styles.header, headerAnimatedStyle]} />
				}}
			/>
			<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.Image
					source={{
						uri: food.image
					}}
					style={[styles.image, imageAnimatedStyle]}
                    className='relative'
				/>
                <Pressable 
                    onPress={() => { router.back() }}
                    className='absolute top-12 left-5 h-10 w-10 bg-white items-center justify-center rounded-full'>
                    <Feather name='arrow-left' size={20} color={'#000'} />
                </Pressable>

				<View style={{ height: 700, backgroundColor: '#fff' }} className='rounded-l-3xl rounded-r-3xl p-7'>
                    <View className='flex-1 flex-col gap-3 w-full h-full'>
                        <View className='flex-row gap-2 items-center w-full'>
                            <Image 
                                source={{ uri: restaurant?.image }}
                                className='w-6 h-6 rounded-full'
                            />
                            <Text className='text-xs font-normal text-gray-400'>
                                {restaurant?.name}
                            </Text>
                        </View>
                        <Text className='text-xl font-semibold'>{food.name}</Text>

                        <View className='flex flex-row justify-between items-center w-full'>
                            <View className='flex flex-row items-center gap-3'>
                                <View className='flex flex-row'>
                                    <Text className='text-xl font-semibold'>
                                        R$ {food.price}
                                    </Text>
                                </View>
                                <View className='bg-red-600 min-w-16 min-h-4 flex flex-row items-center justify-center rounded-2xl p-1'>
                                    <Feather name='arrow-down' size={16} color={"#fff"} />
                                    <Text className='text-white font-bold'>27%</Text>
                                </View>

                            </View>

                            <View className='flex flex-row items-center gap-4'>
                                <Pressable className='border border-b-gray-300 w-8 h-8 items-center justify-center rounded-xl'>
                                    <Feather name='arrow-left' size={16} color={'#000'} />
                                </Pressable>

                                <Text>1</Text>

                                <Pressable className='bg-red-600 w-8 h-8 items-center justify-center rounded-xl'>
                                    <Feather name='arrow-right' size={16} color={'#fff'} />
                                </Pressable>
                            </View>

                        </View>

                        <View className='w-full border border-gray-300 h-24 rounded-xl'>

                            <View className='flex flex-row items-center justify-between p-7'>

                                <View className='flex flex-col items-center justify-center'>
                                    <View className='flex flex-row gap-3 items-center'>
                                        <Text className='text-xl font-semibold text-gray-400'>Entrega</Text>
                                        <FontAwesome name='motorcycle' size={15} />
                                    </View>
                                    <Text className='text-xl text-black font-bold'>
                                        Grátis
                                    </Text>
                                </View>

                                <View className='flex flex-col items-center justify-center'>
                                    <View className='flex flex-row gap-3 items-center'>
                                        <Text className='text-xl font-semibold text-gray-400'>Entrega</Text>
                                        <FontAwesome name='bell' size={15} />
                                    </View>
                                    <Text className='text-xl text-black font-bold'>
                                        30 M
                                    </Text>
                                </View>

                            </View>

                            <View>

                            </View>

                        </View>

                        <View className='w-full h-auto'>
                            <Text className='text-2xl text-black font-bold'>Sobre</Text>
                            <Text className='text-lg text-gray-400'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dicta enim asperiores quas porro laborum voluptatem tempora aut! Ut totam adipisci officiis, voluptate facilis perspiciatis numquam magni quae aut tempora!
                            </Text>
                        </View>

                        <View className='w-full h-auto gap-3'>
                            <Text className='text-2xl text-black font-bold'>Comidas em Alta</Text>
                            <TrendingFood />
                        </View>

                    </View>
				</View>
			</Animated.ScrollView>
		</View>
      );
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	image: {
		width: width,
		height: IMG_HEIGHT
	},
	header: {
		backgroundColor: '#fff',
		height: 100,
		borderWidth: StyleSheet.hairlineWidth
	}
});