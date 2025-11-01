const stories = [
    {
        id: 'red-cliffs',
        title: '赤壁之战 (Red Cliffs)',
        location: '建安十三年（公元208年）',
        excerpt:
            '曹操南征，孙权与刘备结盟，于长江赤壁以火攻大败曹操。周瑜、诸葛亮用智取胜，成为三国时期的转折点。',
        content: `赤壁之战是三国时期最著名的战役之一。**曹操**率大军南下，企图一统天下；**孙权**、**刘备**两方结盟，以火攻取胜。周瑜与诸葛亮的计谋各有传说，其中以火攻最为经典。\n\n### 关键人物\n- 周瑜：东吴名将，擅长统兵与策略。\n- 诸葛亮：刘备之军师，善于智谋与筹划。\n- 曹操：北方强人，统领大军南下。\n\n> 《三国演义》中对赤壁的描写兼具历史与文学色彩，后世对其演义与真实史实有长期讨论。`,
        chapters: [
            {
                id: 'red-cliffs-1', label: '第一回', title: '群雄并起，谋云长',
                content: '第一回（示例）——序章简述群雄并起，曹操势力北方强盛，孙权与刘备联盟的历史背景与张力。'
            },
            {
                id: 'red-cliffs-2', label: '第二回', title: '火攻定乾坤',
                content: '第二回（示例）——详述赤壁布阵与火攻经过，周瑜与诸葛亮合作的关键计策与故事化叙述。'
            }
        ],
        characters: ['周瑜', '诸葛亮', '曹操', '孙权'],
        image: 'https://via.placeholder.com/800x360?text=赤壁之战',
        sources: ['《三国演义》- 罗贯中', '相关历史研究文章'],
        notes: [
            { id: 'note-1', text: '赤壁之战在史书与小说中存在不同的叙述和侧重点。' }
        ],
        more: ''
    },
    {
        id: 'three-kingdoms-pledge',
        title: '桃园三结义 (Oath of the Peach Garden)',
        location: '东汉末年',
        excerpt:
            '刘备、关羽、张飞在桃园结义，誓要匡扶汉室。这一誓言成为他们日后纷繁命运的开端。',
        content: `桃园三结义是《三国演义》中具有标志性的开端场景，三人以**义**为重，发誓同生共死。文学上它被用来强调人物间的忠诚与兄弟情义。\n\n### 背景与影响\n- 象征性意义：强调以义合志，共同对抗乱世。\n- 历史考证：史书对该事件有不同记载，但在后世文学中被广泛传播。`,
        chapters: [
            { id: 'peach-1', label: '第一回', title: '桃园结义', content: '第一回（示例）——刘备、关羽、张飞在桃园誓盟，结为异姓兄弟，立志匡扶汉室。' },
            { id: 'peach-2', label: '第二回', title: '义结金兰的影响', content: '第二回（示例）——阐述三结义如何影响人物命运与后续故事线。' }
        ],
        characters: ['刘备', '关羽', '张飞'],
        image: 'https://via.placeholder.com/800x360?text=桃园三结义',
        sources: ['《三国演义》- 罗贯中'],
        notes: [
            { id: 'note-1', text: '桃园三结义有较强的文学象征意义，史实上争议较多。' }
        ],
        more: ''
    },
    {
        id: 'guan-yu-crossing',
        title: '过五关斩六将 (Guan Yu Crossing Five Passes)',
        location: '群雄割据时期',
        excerpt:
            '关羽为护送刘备家眷，单刀赴会、勇猛过五关、斩六将，显示了忠义与武勇。',
        content: `关羽的过关斩将展现了其个人武勇与忠义品格。故事讲述他在敌对区域中孤身护送刘备家眷，面对重重阻碍仍然成功突围，成为忠义的象征。\n\n### 评述\n- 忠义象征：关羽在民间与文学中常被视为忠义的楷模。\n- 文学渲染：小说对关羽的描写往往带有英雄化成分。`,
        chapters: [
            { id: 'guan-yu-1', label: '第一回', title: '单刀赴会', content: '第一回（示例）——关羽单刀护送家眷，遇险突围的英勇事迹。' }
        ],
        characters: ['关羽'],
        image: 'https://via.placeholder.com/800x360?text=过五关斩六将',
        sources: ['《三国演义》- 罗贯中'],
        notes: [
            { id: 'note-1', text: '关羽形象在小说中被英雄化，文学价值高。' }
        ],
        more: ''
    }
]

export default stories
