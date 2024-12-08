import { ScrollView, Text, View } from "react-native";
import { Header } from "../components/header";

import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import Search from "../components/search";
import { Section } from "../components/section/indes";
import { TrendingFood } from "../components/trading";
import { Restaurants } from "../components/restaurants";
import { RestaurantsVertivcalList } from "../components/list";

const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  return (
    <ScrollView style={{ flex: 1}} className="bg-slate-200" showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header /> 
        <Banner />
        <Search />
      </View>

      <Section 
          name="Comidas em alta" 
          label="Veja Mais" 
          action={() => console.log("CLICOU NO VER MAIS")} 
          size="text-2xl" 
        />

        <View style={{ paddingLeft: 16, paddingRight: 16}}>
          <TrendingFood />
        </View>
        

        <Section 
          name="Famosos de DevFoods" 
          label="Veja Todos" 
          action={() => console.log("CLICOU NO VER MAIS")} 
          size="text-xl" 
        />

        <Restaurants />

        <Section 
          name="Restaurantes" 
          label="Veja Todos" 
          action={() => console.log("CLICOU NO VER MAIS")} 
          size="text-xl" 
        />

        <RestaurantsVertivcalList />

    </ScrollView>
  );
}
