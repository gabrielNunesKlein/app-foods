import { View, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import React from 'react'

export default function Search() {
  return (
    <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
      <Feather name='search' size={24} color="64748b" />
      <TextInput placeholder='Procure sua comida...' 
      className='h-full flex-1 w-full'
      />
    </View>
  )
}