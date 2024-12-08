import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { FoodsProps } from '..'
import { Ionicons } from '@expo/vector-icons'

import { useRouter } from 'expo-router';

interface Props {
    food: FoodsProps;
}

export function CardHorizontalFood({ food }: { food: FoodsProps }) {

  const router = useRouter();

  return (
    <Pressable className='flex flex-col rounded-xl relative' onPress={() => {
      router.push( { pathname: '/details', params: { ...food } })}}>
        <Image 
            source={{ uri: food.image }}
            className='w-44 h-36 rounded-xl'
        />

        <View className='flex-row flex bg-neutral-900/90 w-fit gap-1 rounded-full absolute top-2 right-3 px-2 py-1 items-center justify-center'>
            <Ionicons name='star' size={14} color={"#ca8a04"} />
            <Text className='text-white text-sm'>{food.rating}</Text>
        </View>
        <Text className='text-green-700 font-medium text-lg'>R$ {food.price}</Text>
        <Text className='text-black mt-1'>{food.name}</Text>
        <Text className='text-neutral-600 text-sm'>{food.time} - R$ {food.delivery}</Text>
    </Pressable>
  )
}
