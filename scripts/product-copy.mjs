// @ts-check
/**
 * 商品名・カテゴリから description / material / care を生成（店舗用コピー）
 */

/** @typedef {{ name: string; category: string; gender?: string; id?: string }} CopyInput */

const INTRO = [
  "デイリーにもお出かけにも使いやすい、",
  "動きやすさを意識した、",
  "着心地のよさと見た目のかわいさを両立した、",
  "季節のコーディネートに取り入れやすい、",
];

/** @param {string} seed */
function pickIntro(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return INTRO[Math.abs(h) % INTRO.length];
}

/** @param {string} name */
function isBib(name) {
  return /スタイ|ビブ|ガーゼハンカチスタイ/i.test(name);
}

/** @param {string} name */
function nameHints(name) {
  const n = name;
  return {
    denim: /デニム|denim/i.test(n),
    knit: /ニット|knit|ブークレ|起毛|フリース|カシミヤ/i.test(n),
    tulle: /チュール|tulle/i.test(n),
    corduroy: /コーデュロイ/i.test(n),
    gingham: /ギンガム/i.test(n),
    stripe: /ストライプ|ボーダー/i.test(n),
    embroidery: /刺しゅう|刺繍|アップリケ|モチーフ|プリント|柄/i.test(n),
    outer: /ジャケット|コート|ベスト|アウター|ブルゾン/i.test(n),
    onepiece: /ワンピ|ジャンパースカート|サロペット|ドレス/i.test(n),
    pants: /パンツ|ハーフパンツ|ロングパンツ|テーパード/i.test(n),
    bib: isBib(n),
    baby: /ベビー|ボディースーツ|ブルマ/i.test(n) && !isBib(n),
    bag: /リュック|バッグ|巾着|トート|ナップサック|プールバッグ|ショルダー/i.test(n),
    hat: /帽|キャップ|ハット|ニット帽/i.test(n),
    shoes: /シューズ|スニーカ|サンダル|ブーツ/i.test(n),
    set: /セット|＋|\+/i.test(n),
    inner: /インナー|タイツ|レギンス|下着|ブリーフ|トランクス/i.test(n),
    towel: /タオル|ハンカチ/i.test(n),
    toy: /ぬいぐるみ|おもちゃ|ボウリング|にぎにぎ|ラトル|ぐるぐるスティック/i.test(n),
  };
}

/** @param {CopyInput} input */
export function buildProductDescription(input) {
  const { name, category, id = name } = input;
  const h = nameHints(name);
  const intro = pickIntro(id);

  if (h.bib && !h.set) {
    let detail =
      "肌当たりのやわらかい素材で、食べこぼしやミルクなどからお洋服の汚れを防ぎます。留め具で着脱しやすく、ベビーの毎日使いに適したスタイです。";
    if (/三角スタイ/.test(name)) {
      detail =
        "三角形の形で首元にフィットしやすく、食べこぼしなどから服の汚れを防ぎます。留め具で着脱しやすく、肌当たりのやわらかさを考えたベビー用スタイです。";
    } else if (/ガーゼハンカチ/.test(name)) {
      detail =
        "ガーゼ素材で吸い取りやすく、スタイとしてもハンカチとしても使える二役アイテムです。首元まわりの汚れから服を守り、着脱もしやすい仕様です。";
    }
    let accent = "";
    if (h.embroidery) accent = "モチーフや柄のディテールが、表情豊かな一枚に仕上がっています。";
    else if (h.knit) accent = "やわらかな風合いの素材感が、首元をやさしく包みます。";
    return accent ? `${name}。${detail}${accent}` : `${name}。${detail}`;
  }

  if (h.set && h.bib) {
    const detail =
      "ギフトボックス付きのセットです。同梱のスタイは食べこぼしなどから服を守り、留め具で着脱しやすい仕様。出産祝いやプレゼントにも選びやすい内容です。";
    return `${name}。${detail}`;
  }

  if (h.toy && !h.set) {
    let detail =
      "ベビーの手先にやさしいサイズ感で、握ったり触ったりして遊べるベビー向け小物です。肌当たりのやわらかさを考えた素材で、おうち遊びやお出かけのお供にも使いやすいアイテムです。";
    if (/バスケット/.test(name)) {
      detail =
        "複数のにぎにぎがセットになったバスケット仕様。取り出して遊べるので、ベビーの好奇心をやさしく刺激します。ギフトにも選びやすい内容です。";
    }
    let accent = "";
    if (h.embroidery) accent = "モチーフのディテールが、やさしい表情を添えています。";
    return accent ? `${name}。${detail}${accent}` : `${name}。${detail}`;
  }

  if (h.set && h.toy) {
    const detail =
      "ギフトボックス付きのセットです。にぎにぎやラトルなど、ベビーの手遊び向けアイテムをまとめた内容。出産祝いやプレゼントにも選びやすい組み合わせです。";
    return `${name}。${detail}`;
  }

  let detail = "";
  if (h.bag) {
    detail =
      "軽量で持ち運びやすく、保育園・習い事・お出かけの荷物整理に活躍します。ディテールのデザインが、シンプルなコーディネートのアクセントにもなります。";
  } else if (h.shoes) {
    detail =
      "足元をしっかりサポートし、はきはずししやすい作りを想定した一足です。デイリーの移動からお出かけまで、幅広くお使いいただけます。";
  } else if (h.hat) {
    detail =
      "日差しや風対策に便利で、顔回りをやわらかく彩るシルエットが魅力です。季節の変わり目にも取り入れやすいアイテムです。";
  } else if (h.baby || category === "/category/baby") {
    detail =
      "肌当たりを考えたやわらかな着心地をイメージした、ベビーの日常使い向けアイテムです。着替えのしやすさや動きやすさも意識した仕上がりです。";
  } else if (h.onepiece) {
    detail =
      "ワンピース一枚でサマになる着こなしが可能で、トップスとのレイヤードにも合わせやすいデザインです。お写真映えするディテールもポイントです。";
  } else if (h.outer) {
    detail =
      "気温の変化に合わせて羽織りやすく、インナーとの組み合わせで長く活躍します。シルエットと丈感のバランスが、きちんと見えとカジュアル感を両立します。";
  } else if (h.pants || category === "/category/bottoms") {
    detail =
      "動き回るお子さまでも窮屈になりにくい、すっきりとしたラインが特徴です。トップスを選ばないデザインで、コーディネートの幅が広がります。";
  } else if (h.inner || category === "/category/innerwear") {
    detail =
      "インナーとして快適に過ごせるよう、伸びやすさとフィット感のバランスを意識した仕様です。重ね着の季節にも活躍します。";
  } else if (h.set) {
    detail =
      "セットアップで統一感のあるコーディネートができ、忙しい朝の準備もスムーズに。単品使いにも合わせやすいバランスです。";
  } else if (h.toy || category === "/category/goods") {
    detail =
      "日常の遊びやお出かけのお供にぴったりな、やさしいデザインのアイテムです。ギフトにも選びやすい仕上がりです。";
  } else {
    detail =
      "着回ししやすいデザインで、デイリーからお出かけまで幅広く活躍します。ディテールにこだわった仕上がりが、コーディネートの主役にも脇役にもなります。";
  }

  let accent = "";
  if (h.tulle) accent = "袖や切替のチュールが、軽やかな雰囲気をプラスします。";
  else if (h.denim) accent = "デニムならではの程よいハリ感が、カジュアルな着こなしを引き立てます。";
  else if (h.knit) accent = "やわらかな風合いの素材感が、季節の移り変わりに心地よく寄り添います。";
  else if (h.gingham || h.stripe) accent = "クラシックな柄が、シンプルな装いにさりげないアクセントを添えます。";
  else if (h.embroidery) accent = "モチーフや柄のディテールが、表情豊かな一枚に仕上がっています。";
  else if (h.corduroy) accent = "コーデュロイ特有の温かみのある質感が、秋冬のスタイリングにマッチします。";

  const lead = `${intro}${name}。`;
  return accent ? `${lead}${detail}${accent}` : `${lead}${detail}`;
}

/** @param {CopyInput} input */
export function buildProductMaterial(input) {
  const { name, category } = input;
  const h = nameHints(name);

  if (h.bag) {
    return "本体：ポリエステル／内側：ポリエステル（撥水加工を想定したナイロン系混綿の場合あり）／金具：亜鉛合金";
  }
  if (h.shoes || category === "/category/shoes") {
    return "アッパー：合成皮革・メッシュ／ソール：ラバー／インソール：ポリエステル";
  }
  if (h.bib) {
    if (/ガーゼ/.test(name)) return "本体：綿 100％（ガーゼ・パイル系）／留め具：樹脂スナップ";
    return "本体：綿 100％（天竺・スムース・ガーゼ系）／留め具：樹脂スナップ（仕様により面ファスナーの場合あり）";
  }
  if (h.toy) {
    if (/リネン|コットン/i.test(name)) return "本体：綿 100％（リネン・コットン系）／詰め物：ポリエステル綿（入りの場合あり）";
    return "本体：綿・ポリエステル混綿（にぎにぎ・ラトル系）／詰め物：ポリエステル綿（入りの場合あり）";
  }
  if (h.hat || /accessories/.test(category)) {
    if (h.knit) return "本体：アクリル 60％・ウール 20％・ナイロン 20％（混綿想定）";
    return "本体：綿 100％（ツイル・キャンバス系）／芯地：ポリエステル";
  }
  if (h.denim || /デニム/.test(name)) {
    return "本体：綿 98％・ポリウレタン 2％（ストレッチデニム）／ポケット布：綿 100％";
  }
  if (h.knit) {
    return "本体：アクリル 55％・綿 30％・ナイロン 15％（やわらかニット想定）";
  }
  if (h.tulle) {
    return "本体：綿 100％（天竺・スムース系）／切替：ポリエステル 100％（チュール）";
  }
  if (h.corduroy) {
    return "本体：綿 98％・ポリウレタン 2％（コーデュロイ）";
  }
  if (h.baby || category === "/category/baby") {
    return "本体：綿 100％（オーガニックコットン混綿を想定したやわらか天竺）／留め具：樹脂スナップ";
  }
  if (h.inner || category === "/category/innerwear") {
    return "本体：綿 95％・ポリウレタン 5％（ストレッチコットン）";
  }
  if (category === "/category/outer") {
    return "表地：綿 100％／裏地：ポリエステル 100％（起毛・中わた仕様の場合あり）";
  }
  if (category === "/category/onepiece") {
    return "本体：綿 100％（オックス・天竺系）／裏地：ポリエステル 100％（付く場合あり）";
  }
  if (category === "/category/bottoms") {
    return "本体：綿 100％（チノ・ツイル系）／ウエスト：ゴム＋調節ひも（仕様により異なる場合あり）";
  }
  if (category === "/category/tops") {
    return "本体：綿 100％（天竺・スムース・ガーゼ系）";
  }
  if (category === "/category/goods") {
    if (h.towel) return "本体：綿 100％（パイル・ガーゼ）";
    if (h.toy) return "本体：ポリエステル・ポリエチレン（ぬいぐるみ系）／詰め物：ポリエステル綿";
    return "本体：綿・ポリエステル混綿（アイテムにより異なる場合あり）";
  }
  return "本体：綿 100％（天然素材中心のやわらか仕上げ）";
}

/** @param {CopyInput} input */
export function buildProductCare(input) {
  const { name, category } = input;
  const h = nameHints(name);

  if (h.bag) {
    return "汚れは固く絞った布で軽くたたき、日陰で乾燥させてください。洗濯機・乾燥機は避け、型くずれ防止のため形を整えて保管してください。";
  }
  if (h.shoes || category === "/category/shoes") {
    return "泥汚れは乾いた後にブラシで落とし、湿布で表面を拭いてください。直射日光での乾燥は避け、風通しのよい日陰で乾かしてください。";
  }
  if (h.hat && h.knit) {
    return "ネットに入れて手洗い可能コース、またはウール用洗剤で押し洗い。形を整えて平干しし、アイロンは低温・当て布使用で。";
  }
  if (h.bib) {
    return "ベビー用洗剤で30℃以下の弱水流。汚れは付いた早めに洗い、留め具は閉じてネット洗い。漂白剤は避け、日陰で乾燥させてください。";
  }
  if (h.toy) {
    return "表面の汚れは中性洗剤を含ませた布で軽く拭き取り、十分に風通しを確保して乾燥。洗濯機・浸け置きは避けてください。";
  }
  if (h.hat || (category === "/category/accessories" && !h.inner)) {
    return "手洗い可（中性洗剤・30℃以下）。形を整えて日陰で干し、つばや装飾部分は押さえずに乾燥させてください。";
  }
  if (h.denim) {
    return "裏返してネットに入れ、冷水・弱水流で洗濯。漂白剤は使わず、タンブラー乾燥は避けて形を整えて吊り干ししてください。";
  }
  if (h.knit) {
    return "ネットに入れて手洗いまたはウールコース（弱水流）。形を整えて平干しし、長時間の浸け置き・強い絞りは避けてください。";
  }
  if (h.tulle) {
    return "ネットに入れて弱水流・中性洗剤で洗濯。チュール部分は他物との摩擦を避け、陰干しで形を整えてください。";
  }
  if (h.baby || category === "/category/baby") {
    return "ベビー用洗剤で30℃以下の弱水流。柔軟剤は少なめに。スナップは閉じてネット洗いし、日陰で乾燥させてください。";
  }
  if (h.inner || category === "/category/innerwear") {
    return "ネットに入れて弱水流・中性洗剤。形を整えて干し、乾燥機は避けて伸びを防いでください。";
  }
  if (category === "/category/outer") {
    return "ネット洗い・弱水流。毛玉防止のため単独または同系色で洗濯。裏返し、日陰干し。アイロンは当て布・中温まで。";
  }
  if (h.toy || (category === "/category/goods" && h.toy)) {
    return "表面の汚れは中性洗剤を含ませた布で軽く拭き取り、十分に風通しを確保して乾燥。洗濯機・浸け置きは避けてください。";
  }
  if (category === "/category/goods" && h.towel) {
    return "40℃以下で単独または同色で洗濯。初回は色落ちに注意。柔らかさを保つため過度な乾燥機使用は避けてください。";
  }
  return "ネットに入れて弱水流・中性洗剤で洗濯。形を整えて日陰干しし、漂白・タンブラー乾燥は避けてください。";
}

/** @param {CopyInput} input */
export function buildProductCopy(input) {
  return {
    description: buildProductDescription(input),
    material: buildProductMaterial(input),
    care: buildProductCare(input),
  };
}
