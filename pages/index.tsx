import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import goodsList from "./goods/goodsList";
import styled from "styled-components";

const Home: NextPage = () => {
  // 課題文
  const q: string =
    "n個の品物があり、i番目の品物のそれぞれ重さと価値が weight[i],value[i]となっている (i=0,1,...,n−1)。これらの品物から重さの総和がWを超えないように選んだときの、価値の総和の最大値を求めよ。";
  /*
   * 画面表示に使用するuseState Hooksを定義
   */
  // 最大重量を保持
  const [maxWeight, setMaxWeight] = useState(0);
  // 残重量を保持
  const [amountWeight, setAmountWeight] = useState(0);
  // 重さ1あたりの価値を算出し、コストパフォーマンスとして項目追加する配列を保持
  const [costPf, setCostPf] = useState<[string, number, number, number][]>();
  // 選択した品物を保持
  const [bag, setBag] = useState<[string, number, number, number][]>();
  // 選択した品物の重さを保持
  const [bagInWeight, setBagInWeight] = useState(0);
  // 選択した品物の価値を保持
  const [bagInValue, setBagInValue] = useState(0);

  /*
   * 一時的に保持するArray・変数を定義
   */
  let costPfArr = new Array<[string, number, number, number]>();
  // 品物を選択していく際のオブジェクトを保持する配列
  let bagArr = new Array<[string, number, number, number]>();
  // 品物を選択していく際の重さを保持する配列
  let bagWArr: number = 0;
  // 品物を選択していく際の価値を保持する配列
  let bagVArr: number = 0;

  // 最大価値の総和を計算するメソッド
  const calc = () => {
    /** Array Example /名前/重さ/価値/コスパ
     *  0: (4) ['りんご', 3, 3, 1]
        1: (4) ['みかん', 2, 3, 1.5]
        2: (4) ['メロン', 5, 20, 4] ..etc
     */

    // ソート用の配列を作成
    let sortArr: [string, number, number, number][] = JSON.parse(
      JSON.stringify(costPf)
    );
    // 重さ1/価値のコスパ順で配列をソート
    sortArr.sort((a, b) => {
      if (a[3] < b[3]) {
        return 1;
      } else {
        return -1;
      }
    });

    // 最大重量から選択した品物の重さを減算していく変数
    let tmpTotalWeight: number = maxWeight;

    // forループでソート後の配列からコスパ項目の高い順に選択していく
    for (let i = 0; i < sortArr.length; i++) {
      // [重量] - [選択する品物の重さ]が0を下回らない場合のみ、選択
      if (tmpTotalWeight - sortArr[i][1] >= 0) {
        // 選択した品物を配列に追加していく
        bagArr.push(sortArr[i]);
        // 選択した品物の重さを足していく
        bagWArr += sortArr[i][1];
        // 選択した品物の価値を足していく
        bagVArr += sortArr[i][2];
        // 残重量から選択した品物の重さ（weight）を減算
        tmpTotalWeight = tmpTotalWeight - sortArr[i][1];
      }
      /*
       *状態管理に保存
       **/
      // 品物
      setBag(bagArr);
      // 重さ
      setBagInWeight(bagWArr);
      // 価値
      setBagInValue(bagVArr);
    }
    // 残重量
    setAmountWeight(tmpTotalWeight);
  };

  // 初期処理
  useEffect(() => {
    /* 品物リストから[1重さ当たりの価値](コストパフォーマンス)を計算した項目をGoods配列に追加。
     *  コストパフォーマンス項目を加えた新たな配列[costPfArr]を作成し、useStateに保持。
     */
    goodsList.forEach((g) =>
      costPfArr.push([g.name, g.weight, g.value, g.value / g.weight])
    );
    setCostPf(costPfArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper className="App">
      <Q>{q}</Q>
      <label>
        最大重量（W）を入力:
        <input
          type="text"
          value={maxWeight}
          onChange={(event) => setMaxWeight(Number(event.target.value))}
        />
      </label>
      <Button onClick={() => calc()}>計算</Button>
      <p>選んだ品物の重さ(weight)の総和:{bagInWeight}</p>
      <p>選んだ品物の価値(value)の総和:{bagInValue}</p>
      <p>残重量:{amountWeight}</p>
      <FlexBox>
        <div>
          <h4>品物リスト</h4>
          {goodsList.map((goods) => (
            <>
              <UlStyled>
                <li>品名:{goods.name}</li>
                <li>重さ:{goods.weight}</li>
                <li>価値:{goods.value}</li>
              </UlStyled>
            </>
          ))}
        </div>
        <div>
          <h4>選択した品物</h4>
          {bag &&
            bag.map((goods) => (
              <>
                <UlStyledC>
                  <li>品名:{goods[0]}</li>
                  <li>重さ:{goods[1]}</li>
                  <li>価値:{goods[2]}</li>
                </UlStyledC>
              </>
            ))}
        </div>
      </FlexBox>
    </Wrapper>
  );
};
const UlStyled = styled.ul`
  list-style: none;
  text-align: left;
  margin: auto;
  border: 1px solid #222;
  padding: 10px;
`;
const UlStyledC = styled.ul`
  list-style: none;
  text-align: left;
  margin: auto;
  border: 1px solid #222;
  padding: 10px;
  background-color: #ffe8bd;
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: center;
`;
const Button = styled.button`
  margin-left: 15px;
  padding: 0 10px;
`;
const Wrapper = styled.div`
  padding: 5% 20%;
  margin: 5%;
  width: 80%;
  margin: auto;
  border: 1px solid #222;
  border-radius: 50px;
`;
const Q = styled.div`
  margin: 20px auto;
  text-align: left;
  width: 70%;
  font-weight: bold;
`;

export default Home;
