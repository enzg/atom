> Base is a **mode** of this game
> Free is a **state** of Base
> Super Reel is a **state** of Base
> Bonus and Treasure are  **mode** besides Base



## Base
  - enter: 从gameRecord 读取之前状态。
  **只记录base的游戏结果**

  - leave:
  Base =>Free  
  Base => Treasure
  Base => Bonus
## Super Reel
- trigger
1. wild symbol on reel will increase **Super Reel** by one
2. Bonus prize will increase the **Super Reel** count
- consume:
1. consume one by spin util zero to exit 

## Free
- trigger:
1. ```scatter win```
2. bonus prize will increase ```freeRemainCount```
  mode:  ```base -> free```

- leave:
  1. freeRemainCount < 0
  2. free as a state of base inherit the mode transfer of Base.
  > Base => Free (increase freeRemainCount.  **not transfer scene**)
  > Base => Treasure (transfer to Treasure scene)
  > Base => Bonus (transfer to Bonus scene)


#### Bonus
- enter:  ```Bonus Win```

  **state** of Bonus

   - ```base bonus``` (enter from ```base``` )
   - ```free bonus``` (enter from ```free``` )
   - ```free plus bonus``` ( ```free bonus``` => ```free plus bonus``` )

- leave: spin to **end state**
#### Treasure
- enter: Treasure level >= 100 and trigger == true( 5% )
  state: none
- leave: get prize
