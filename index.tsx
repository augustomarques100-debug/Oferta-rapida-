import React, { useMemo, useState } from 'react';
import {
  Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet,
  Text, TextInput, View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  {id:'1',title:'Smartphone Pro 256 GB',store:'Loja Demo',price:3899,shipping:0,days:1,score:98,image:'https://images.unsplash.com/photo-1592286927505-2fd4c3c3f2e5?auto=format&fit=crop&w=900&q=85'},
  {id:'2',title:'Notebook 15” SSD 512 GB',store:'Loja Demo',price:3199,shipping:0,days:2,score:96,image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'},
  {id:'3',title:'Smart TV 55” 4K',store:'Loja Demo',price:2799,shipping:49.9,days:1,score:95,image:'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=85'},
  {id:'4',title:'Console de videogame',store:'Loja Demo',price:2999,shipping:0,days:3,score:92,image:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85'},
  {id:'5',title:'Robô aspirador inteligente',store:'Loja Demo',price:1199,shipping:0,days:2,score:90,image:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=85'},
  {id:'6',title:'Monitor gamer 27”',store:'Loja Demo',price:1499,shipping:0,days:4,score:88,image:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85'}
];

export default function Home() {
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState<'best'|'fast'|'price'>('best');
  const [favorites,setFavorites]=useState<string[]>([]);
  const [tab,setTab]=useState('Início');

  const list=useMemo(()=>{
    const q=query.toLowerCase().trim();
    let a=products.filter(p=>p.title.toLowerCase().includes(q));
    if(sort==='fast') a=[...a].sort((x,y)=>x.days-y.days);
    if(sort==='price') a=[...a].sort((x,y)=>(x.price+x.shipping)-(y.price+y.shipping));
    if(sort==='best') a=[...a].sort((x,y)=>y.score-x.score);
    return a;
  },[query,sort]);

  const toggleFav=(id:string)=>{
    setFavorites(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  };

  const alertPrice=(p:any)=>{
    Alert.alert('🔔 Alerta de preço', `Vamos acompanhar ${p.title}.`, [
      {text:'Cancelar',style:'cancel'},
      {text:'Ativar',onPress:()=>Alert.alert('Alerta ativado','Na versão conectada, o aviso será enviado pelo WhatsApp após sua autorização.')}
    ]);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <View>
          <Text style={s.logo}>Oferta <Text style={s.logo2}>Rápida</Text></Text>
          <Text style={s.sub}>Melhores ofertas, mais rápido.</Text>
        </View>
        <Pressable style={s.bell} onPress={()=>Alert.alert('Notificações','Seus alertas de preço aparecerão aqui.')}>
          <Ionicons name="notifications-outline" size={23} color="#fff"/>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <Text style={s.heroTitle}>Compre melhor.{'
'}Receba mais rápido.</Text>
          <Text style={s.heroText}>Compare preço, frete e prazo em um só lugar.</Text>
          <View style={s.search}>
            <Ionicons name="search" size={20} color="#777"/>
            <TextInput value={query} onChangeText={setQuery} placeholder="O que você quer comprar?" placeholderTextColor="#888" style={s.input}/>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
          {['Todos','Celulares','Informática','TV','Games','Casa'].map((x,i)=><Pressable key={x} style={[s.chip,i===0&&s.chipActive]}><Text style={[s.chipText,i===0&&s.chipTextActive]}>{x}</Text></Pressable>)}
        </ScrollView>

        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Ofertas para você</Text>
          <Text style={s.count}>{list.length} resultados</Text>
        </View>

        <View style={s.sortRow}>
          {([['best','Melhor compra'],['fast','Mais rápida'],['price','Menor preço']] as const).map(([id,label])=>
            <Pressable key={id} onPress={()=>setSort(id)} style={[s.sort,s.sortOn&&sort===id?s.sortSelected:null]}>
              <Text style={[s.sortText,sort===id&&s.sortTextOn]}>{label}</Text>
            </Pressable>
          )}
        </View>

        {list.map(p=>
          <View key={p.id} style={s.card}>
            <View>
              <Image source={{uri:p.image}} style={s.photo}/>
              <Pressable style={s.fav} onPress={()=>toggleFav(p.id)}>
                <Ionicons name={favorites.includes(p.id)?'heart':'heart-outline'} size={21} color={favorites.includes(p.id)?'#FF3B30':'#222'}/>
              </Pressable>
              <View style={s.fastBadge}><Text style={s.fastText}>{p.days===1?'CHEGA AMANHÃ':`CHEGA EM ${p.days} DIAS`}</Text></View>
            </View>
            <View style={s.cardBody}>
              <Text style={s.store}>{p.store}</Text>
              <Text style={s.title}>{p.title}</Text>
              <Text style={s.old}>Comparado em várias lojas</Text>
              <Text style={s.price}>R$ {p.price.toLocaleString('pt-BR',{minimumFractionDigits:2})}</Text>
              <Text style={s.ship}>{p.shipping===0?'Frete grátis':`+ R$ ${p.shipping.toFixed(2).replace('.',',')} de frete`}</Text>
              <View style={s.scoreRow}><Text style={s.score}>Oferta {p.score}/100</Text><Text style={s.days}>⚡ {p.days} dia(s)</Text></View>
              <Pressable style={s.alertBtn} onPress={()=>alertPrice(p)}>
                <Ionicons name="notifications-outline" size={17} color="#FF6A00"/>
                <Text style={s.alertText}>Criar alerta de preço</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={s.premium}>
          <Text style={s.premiumTag}>OFERTA RÁPIDA PREMIUM</Text>
          <Text style={s.premiumTitle}>Receba as melhores oportunidades primeiro.</Text>
          <Text style={s.premiumText}>Alertas de queda de preço, filtros avançados e ofertas selecionadas.</Text>
          <Pressable style={s.premiumBtn} onPress={()=>Alert.alert('Premium','Tela de assinatura preparada para a integração de pagamentos.')}>
            <Text style={s.premiumBtnText}>Conhecer Premium</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={s.nav}>
        {[
          ['Início','home-outline','home'],
          ['Favoritos','heart-outline','heart'],
          ['Alertas','notifications-outline','notifications'],
          ['Premium','diamond-outline','diamond']
        ].map(([label,outline,solid])=>{
          const active=tab===label;
          return <Pressable key={label} onPress={()=>setTab(label)} style={s.navItem}>
            <Ionicons name={(active?solid:outline) as any} size={23} color={active?'#FF6A00':'#777'}/>
            <Text style={[s.navText,active&&s.navTextOn]}>{label}</Text>
          </Pressable>
        })}
      </View>
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#F5F6F8'},
 header:{backgroundColor:'#FF6A00',paddingHorizontal:18,paddingTop:12,paddingBottom:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
 logo:{color:'#fff',fontSize:25,fontWeight:'900'},logo2:{color:'#FFE1C7'},sub:{color:'#fff',opacity:.9,fontSize:12,marginTop:2},
 bell:{width:42,height:42,borderRadius:21,backgroundColor:'rgba(255,255,255,.18)',alignItems:'center',justifyContent:'center'},
 content:{paddingBottom:105},
 hero:{backgroundColor:'#FF6A00',paddingHorizontal:18,paddingBottom:22,borderBottomLeftRadius:28,borderBottomRightRadius:28},
 heroTitle:{color:'#fff',fontSize:28,fontWeight:'900',lineHeight:31},heroText:{color:'#fff',marginTop:9,opacity:.92},
 search:{height:52,backgroundColor:'#fff',borderRadius:15,marginTop:18,flexDirection:'row',alignItems:'center',paddingHorizontal:14},
 input:{flex:1,fontSize:15,marginLeft:8,color:'#222'},chips:{padding:16,gap:9},chip:{backgroundColor:'#fff',paddingHorizontal:16,paddingVertical:10,borderRadius:22},chipActive:{backgroundColor:'#222'},chipText:{fontWeight:'700',color:'#555'},chipTextActive:{color:'#fff'},
 sectionRow:{paddingHorizontal:16,flexDirection:'row',alignItems:'baseline',justifyContent:'space-between'},sectionTitle:{fontSize:21,fontWeight:'900',color:'#171717'},count:{fontSize:12,color:'#888'},
 sortRow:{padding:12,paddingHorizontal:16,flexDirection:'row',gap:8},sort:{paddingHorizontal:12,paddingVertical:9,borderRadius:14,backgroundColor:'#fff'},sortSelected:{backgroundColor:'#FFF0E7'},sortText:{fontSize:12,fontWeight:'800',color:'#666'},sortTextOn:{color:'#FF6A00'},
 card:{backgroundColor:'#fff',marginHorizontal:16,marginBottom:14,borderRadius:20,overflow:'hidden',elevation:2},photo:{width:'100%',height:190,backgroundColor:'#eee'},fav:{position:'absolute',right:12,top:12,width:40,height:40,borderRadius:20,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},fastBadge:{position:'absolute',left:12,bottom:12,backgroundColor:'#1B9B5A',paddingHorizontal:10,paddingVertical:6,borderRadius:10},fastText:{color:'#fff',fontSize:10,fontWeight:'900'},
 cardBody:{padding:15},store:{fontSize:11,color:'#888',fontWeight:'700'},title:{fontSize:18,fontWeight:'900',marginTop:4,color:'#171717'},old:{fontSize:11,color:'#999',marginTop:5},price:{fontSize:25,fontWeight:'900',color:'#FF6A00',marginTop:8},ship:{fontSize:12,color:'#555',marginTop:1},scoreRow:{flexDirection:'row',justifyContent:'space-between',marginTop:12},score:{fontWeight:'900',color:'#1B9B5A'},days:{fontWeight:'800',color:'#444'},alertBtn:{marginTop:13,borderWidth:1,borderColor:'#FFD1B1',borderRadius:12,paddingVertical:10,alignItems:'center',flexDirection:'row',justifyContent:'center',gap:6},alertText:{color:'#FF6A00',fontWeight:'900'},
 premium:{margin:16,marginTop:8,padding:20,borderRadius:22,backgroundColor:'#202020'},premiumTag:{color:'#FF9A54',fontSize:11,fontWeight:'900'},premiumTitle:{color:'#fff',fontSize:21,fontWeight:'900',marginTop:7},premiumText:{color:'#ccc',fontSize:13,lineHeight:19,marginTop:8},premiumBtn:{backgroundColor:'#FF6A00',marginTop:15,padding:13,borderRadius:12,alignItems:'center'},premiumBtnText:{color:'#fff',fontWeight:'900'},
 nav:{position:'absolute',bottom:0,left:0,right:0,height:82,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#eee',flexDirection:'row',justifyContent:'space-around',paddingTop:9},navItem:{alignItems:'center',flex:1},navText:{fontSize:10,color:'#777',marginTop:3,fontWeight:'700'},navTextOn:{color:'#FF6A00'}
});
