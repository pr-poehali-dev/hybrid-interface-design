import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Case {
  id: number;
  name: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
}

interface Item {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  image: string;
}

interface Player {
  id: number;
  name: string;
  avatar: string;
  totalWon: number;
  casesOpened: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [coins, setCoins] = useState(15000);
  const [inventory, setInventory] = useState<Item[]>([
    { id: 1, name: 'Золотой AWP', rarity: 'legendary', value: 5000, image: '🔫' },
    { id: 2, name: 'Редкий нож', rarity: 'epic', value: 3000, image: '🔪' },
    { id: 3, name: 'AK-47', rarity: 'rare', value: 1500, image: '🎯' },
  ]);

  const cases: Case[] = [
    { id: 1, name: 'Легендарный', price: 5000, rarity: 'legendary', image: '💎' },
    { id: 2, name: 'Эпический', price: 3000, rarity: 'epic', image: '🎁' },
    { id: 3, name: 'Редкий', price: 1500, rarity: 'rare', image: '📦' },
    { id: 4, name: 'Обычный', price: 500, rarity: 'common', image: '🎲' },
    { id: 5, name: 'VIP кейс', price: 10000, rarity: 'legendary', image: '👑' },
    { id: 6, name: 'Дейли', price: 0, rarity: 'common', image: '🎯' },
  ];

  const topPlayers: Player[] = [
    { id: 1, name: 'ProGamer', avatar: '🎮', totalWon: 50000, casesOpened: 120 },
    { id: 2, name: 'LuckyOne', avatar: '🍀', totalWon: 45000, casesOpened: 95 },
    { id: 3, name: 'CaseHunter', avatar: '🎯', totalWon: 38000, casesOpened: 150 },
  ];

  const recentDrops = [
    { user: 'Player1', item: 'Золотой AWP', rarity: 'legendary' },
    { user: 'Player2', item: 'AK-47', rarity: 'rare' },
    { user: 'Player3', item: 'Нож', rarity: 'epic' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-game-gold via-game-orange to-game-pink';
      case 'epic': return 'from-game-purple via-purple-600 to-game-purple';
      case 'rare': return 'from-blue-500 via-game-blue to-blue-600';
      default: return 'from-gray-600 via-gray-700 to-gray-800';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-game-gold text-black';
      case 'epic': return 'bg-game-purple text-white';
      case 'rare': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleOpenCase = (caseItem: Case) => {
    if (coins >= caseItem.price) {
      setCoins(coins - caseItem.price);
      const newItem: Item = {
        id: Date.now(),
        name: `Предмет из ${caseItem.name}`,
        rarity: caseItem.rarity,
        value: caseItem.price * (Math.random() + 0.5),
        image: ['🔫', '🔪', '🎯', '🛡️'][Math.floor(Math.random() * 4)],
      };
      setInventory([newItem, ...inventory]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-dark via-game-blue to-black text-white">
      <div className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-white">👤</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">Игрок</p>
              <div className="flex items-center gap-1 text-game-gold">
                <Icon name="Coins" size={16} />
                <span className="font-bold">{coins.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-24 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="cases" className="flex flex-col items-center gap-1">
              <Icon name="Package" size={20} />
              <span className="text-xs">Кейсы</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex flex-col items-center gap-1">
              <Icon name="Backpack" size={20} />
              <span className="text-xs">Инвентарь</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex flex-col items-center gap-1">
              <Icon name="Trophy" size={20} />
              <span className="text-xs">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex flex-col items-center gap-1">
              <Icon name="History" size={20} />
              <span className="text-xs">История</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-game-gold via-game-purple to-game-pink bg-clip-text text-transparent">
                Открой свой кейс
              </h1>
              <p className="text-muted-foreground">Получай редкие предметы и выигрывай монеты</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 mb-6">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Icon name="Zap" size={16} className="text-game-gold" />
                Последние дропы
              </h3>
              <ScrollArea className="h-20">
                <div className="space-y-2">
                  {recentDrops.map((drop, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{drop.user}</span>
                      <Badge className={getRarityBadgeColor(drop.rarity)} variant="secondary">
                        {drop.item}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`relative overflow-hidden border-2 bg-gradient-to-br ${getRarityColor(caseItem.rarity)} p-[2px] hover:scale-105 transition-transform duration-300 case-glow`}
                >
                  <div className="bg-card rounded-lg p-4 h-full flex flex-col items-center justify-between">
                    <div className="text-6xl mb-3 float">{caseItem.image}</div>
                    <div className="text-center w-full">
                      <h3 className="font-bold mb-2">{caseItem.name}</h3>
                      <Badge className={getRarityBadgeColor(caseItem.rarity)} variant="secondary">
                        {caseItem.rarity}
                      </Badge>
                      <Button
                        onClick={() => handleOpenCase(caseItem)}
                        disabled={coins < caseItem.price}
                        className="w-full mt-3 bg-primary hover:bg-primary/90 text-white font-bold"
                      >
                        {caseItem.price === 0 ? 'БЕСПЛАТНО' : `${caseItem.price.toLocaleString()} 💰`}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Мой инвентарь</h2>
              <p className="text-muted-foreground">Всего предметов: {inventory.length}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <Card
                  key={item.id}
                  className={`bg-gradient-to-br ${getRarityColor(item.rarity)} p-[2px]`}
                >
                  <div className="bg-card rounded-lg p-4 h-full flex flex-col items-center justify-between">
                    <div className="text-5xl mb-3">{item.image}</div>
                    <div className="text-center w-full">
                      <h3 className="font-bold text-sm mb-2">{item.name}</h3>
                      <Badge className={getRarityBadgeColor(item.rarity)} variant="secondary">
                        {item.rarity}
                      </Badge>
                      <div className="mt-2 text-game-gold font-bold">
                        {item.value.toLocaleString()} 💰
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rating" className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Топ игроков</h2>
              <p className="text-muted-foreground">Лучшие по выигрышам</p>
            </div>
            <div className="space-y-3">
              {topPlayers.map((player, index) => (
                <Card key={player.id} className="bg-card/80 backdrop-blur-sm">
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-3xl font-bold text-game-gold">#{index + 1}</div>
                    <div className="text-4xl">{player.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{player.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>🏆 {player.totalWon.toLocaleString()}</span>
                        <span>📦 {player.casesOpened}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">История открытий</h2>
              <p className="text-muted-foreground">Твои последние дропы</p>
            </div>
            <div className="space-y-3">
              {inventory.slice(0, 10).map((item) => (
                <Card key={item.id} className="bg-card/80 backdrop-blur-sm">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{item.image}</div>
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <Badge className={getRarityBadgeColor(item.rarity)} variant="secondary">
                          {item.rarity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-game-gold font-bold">
                      +{item.value.toLocaleString()} 💰
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <Card className="bg-card/80 backdrop-blur-sm">
              <div className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarFallback className="bg-primary text-white text-4xl">👤</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">Игрок</h2>
                <div className="flex items-center justify-center gap-2 text-game-gold text-2xl mb-6">
                  <Icon name="Coins" size={24} />
                  <span className="font-bold">{coins.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-2xl font-bold">{inventory.length}</div>
                    <div className="text-sm text-muted-foreground">Предметов</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="text-3xl mb-2">💎</div>
                    <div className="text-2xl font-bold">
                      {inventory.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Общая ценность</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
