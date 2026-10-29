--Tell and Get Table creation
CREATE TABLE public.tell_and_get (
    id UUID PRIMARY KEY DEFAULT get_random_uuid(),
    category public.message_category NOT NULL,
    image_id TEXT,
    predefined_messages JSONB DEFAULT '[]'::jsonb,
    user_message JSONB,
    user_id UUID REFERENCES public.users(id) NOT NULL ON DELETE CASCADE,
    couple_id UUID REFERENCES public.couples(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_pinned BOOLEAN DEFAULT FALSE,

    CONSTRAINT at_least_one_message_required
    CHECK (
        (
            predefined_messages IS NOT NULL
            AND predefined_messages <> '[]'::jsonb
        )
        OR user_message IS NOT NULL
    )
);


ALTER TABLE public.tell_and_get
ENABLE ROW LEVEL SECURITY;

--Policies
CREATE POLICY "authenticated users can read their own likings and unlikings"
ON public.tell_and_get
FOR SELECT
TO authenticated
USING (user_id = auth.uid()
       AND EXISTS(
        SELECT 1 FROM public.couples c
        WHERE c.id = couple_id
        AND (
            c.partner_1 = auth.uid() OR
            c.partner_2 = auth.uid()
        )
       )
);


CREATE POLICY "authenticated users can insert in the likings and unlikings"
ON public.tell_and_get
FOR INSERT
TO authenticated
WITH CHECK(
    user_id = auth.uid()
);


CREATE POLICY "authenticated users can update their own likings and unlikings"
ON public.tell_and_get
FOR UPDATE
TO authenticated
USING(user_id = auth.uid())
WITH CHECK(
    user_id = auth.uid()
);


CREATE POLICY "authenticated users can delete their own likings and unlikings"
ON public.tell_and_get
FOR DELETE
TO authenticated
USING(user_id = auth.uid());


GRANT ALL ON public.tell_and_get TO authenticated;






-- Predefined messages
CREATE TYPE public.message_category AS ENUM ('liking', 'unliking');

CREATE TABLE public.predefined_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    category public.message_category NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    emoji TEXT,

    CONSTRAINT options_must_be_array
    CHECK(jsonb_typeof(options) = 'array')
);



INSERT INTO public.predefined_messages (title, options, category, emoji)
VALUES

-- =====================================================
-- LIKING CATEGORIES
-- =====================================================

(
    'Affection & Love',
    '[
        "You make me feel loved.",
        "You make me feel special every day.",
        "I love the way you express your affection.",
        "You make even ordinary moments feel special.",
        "I feel lucky to have you in my life.",
        "I love the way you look at me.",
        "Your hugs make everything better.",
        "You always find ways to make me feel appreciated.",
        "I love hearing you say that you love me.",
        "You make me feel like I belong."
    ]'::jsonb,
    'liking',
    '❤️'
),

(
    'Care & Support',
    '[
        "You always take care of me when I am unwell.",
        "You check on me when I am having a difficult day.",
        "You remember the little things that matter to me.",
        "You support me when I doubt myself.",
        "You make sure I am comfortable.",
        "You listen when I need someone to talk to.",
        "You encourage me to take care of myself.",
        "You stand beside me when things get difficult.",
        "You notice when something is bothering me.",
        "You make me feel that I am not alone."
    ]'::jsonb,
    'liking',
    '🤗'
),

(
    'Daily Life',
    '[
        "You are cooking my favourite dish.",
        "You are doing the laundry.",
        "You helped me clean the house.",
        "You made me breakfast today.",
        "You brought me something I needed.",
        "You helped me with my daily responsibilities.",
        "You prepared something special for me.",
        "You made my morning easier.",
        "You helped me with an everyday task without being asked.",
        "You made our home feel more comfortable."
    ]'::jsonb,
    'liking',
    '🏡'
),

(
    'Communication',
    '[
        "You listen to me without interrupting.",
        "You explain your feelings honestly.",
        "You make an effort to understand my perspective.",
        "You communicate instead of making assumptions.",
        "You ask me about my day.",
        "You tell me when something is bothering you.",
        "You make difficult conversations easier.",
        "You give me your full attention when we talk.",
        "You communicate with patience.",
        "You make me feel comfortable sharing my thoughts."
    ]'::jsonb,
    'liking',
    '💬'
),

(
    'Fun & Happiness',
    '[
        "You always know how to make me laugh.",
        "You make boring days exciting.",
        "I love our silly conversations.",
        "You make me smile without even trying.",
        "You bring positive energy into my life.",
        "I love being playful with you.",
        "You make our little adventures memorable.",
        "You know how to cheer me up.",
        "I love laughing together with you.",
        "You make spending time together so much fun."
    ]'::jsonb,
    'liking',
    '🥰'
),

(
    'Personality',
    '[
        "I admire how patient you are.",
        "I love your sense of humour.",
        "Your kindness inspires me.",
        "I admire your determination.",
        "I love how thoughtful you are.",
        "You have such a beautiful personality.",
        "I appreciate how genuine you are.",
        "Your confidence motivates me.",
        "I admire the way you handle difficult situations.",
        "I love how comfortable you are being yourself."
    ]'::jsonb,
    'liking',
    '✨'
),

(
    'Romance',
    '[
        "You planned a beautiful date for us.",
        "I love the romantic surprises you give me.",
        "You make ordinary moments romantic.",
        "I love holding your hand.",
        "You still give me butterflies.",
        "I love the way you flirt with me.",
        "You make me feel special on our anniversaries.",
        "I love our romantic little moments.",
        "You make me feel like we are dating all over again.",
        "I love the way you make time for romance."
    ]'::jsonb,
    'liking',
    '💗'
),

(
    'Quality Time',
    '[
        "You put your phone away when we spend time together.",
        "You make time for us despite your busy schedule.",
        "I love watching movies together.",
        "You enjoy going on walks with me.",
        "I love our late-night conversations.",
        "You suggest activities we can do together.",
        "You make our weekends special.",
        "I love simply sitting beside you.",
        "You make me feel that our time together matters.",
        "You enjoy doing even the simplest things with me."
    ]'::jsonb,
    'liking',
    '⏳'
),

(
    'Efforts & Growth',
    '[
        "You are making an effort to improve our relationship.",
        "You acknowledge your mistakes and learn from them.",
        "You are working towards your goals.",
        "You try to understand my needs better.",
        "You make an effort to keep your promises.",
        "You are willing to compromise when needed.",
        "You take responsibility for your actions.",
        "You try new things to make our relationship stronger.",
        "You appreciate my efforts too.",
        "I love seeing you grow as a person."
    ]'::jsonb,
    'liking',
    '🌱'
),

(
    'Appearance',
    '[
        "You look beautiful today.",
        "I love your smile.",
        "You look adorable when you are sleepy.",
        "I love the way you dress.",
        "Your eyes are beautiful.",
        "I love your natural look.",
        "You look especially attractive today.",
        "I love your hairstyle.",
        "You look cute when you are excited.",
        "You are beautiful even when you do not realise it."
    ]'::jsonb,
    'liking',
    '😍'
),

(
    'Trust & Respect',
    '[
        "You respect my personal boundaries.",
        "You trust me and make me feel trusted.",
        "You respect my opinions even when we disagree.",
        "You keep your promises.",
        "You are honest with me.",
        "You respect my individuality.",
        "You give me space when I need it.",
        "You make me feel secure in our relationship.",
        "You respect the things that matter to me.",
        "I appreciate how we can trust each other."
    ]'::jsonb,
    'liking',
    '🤝'
),

(
    'Little Things',
    '[
        "You sent me a sweet message today.",
        "You remembered something I mentioned weeks ago.",
        "You saved me the last piece of my favourite food.",
        "You gave me a random compliment.",
        "You shared something funny with me.",
        "You kissed me before leaving.",
        "You brought me my favourite snack.",
        "You held my hand unexpectedly.",
        "You noticed my new outfit.",
        "You made me smile with a tiny surprise."
    ]'::jsonb,
    'liking',
    '🌷'
),

-- =====================================================
-- UNLIKING CATEGORIES
-- =====================================================

(
    'Emotional Needs',
    '[
        "I feel emotionally lonely sometimes.",
        "I feel like my emotions are not understood.",
        "I need more emotional support from you.",
        "I sometimes feel disconnected from you.",
        "I wish you would ask how I am feeling more often.",
        "I need reassurance when I feel insecure.",
        "I feel like I am handling my emotions alone.",
        "I wish you would notice when I am not okay.",
        "I need more affection when I am having a difficult day.",
        "Sometimes I just need you to be there for me."
    ]'::jsonb,
    'unliking',
    '💔'
),

(
    'Communication Problems',
    '[
        "I feel unheard when I try to explain something.",
        "I feel like we avoid difficult conversations.",
        "Sometimes I do not know what you are thinking.",
        "I wish you would communicate more openly with me.",
        "I feel misunderstood during our conversations.",
        "I do not like when important conversations are postponed.",
        "I feel like we make assumptions instead of asking questions.",
        "I wish you would listen before responding.",
        "Sometimes our conversations feel one-sided.",
        "I want us to talk more honestly about our feelings."
    ]'::jsonb,
    'unliking',
    '💬'
),

(
    'Time & Attention',
    '[
        "I feel like we do not spend enough quality time together.",
        "I sometimes feel ignored when you are on your phone.",
        "I miss having uninterrupted time with you.",
        "I feel like other things always get priority over us.",
        "I wish you would initiate spending time together more often.",
        "I miss our long conversations.",
        "I feel disconnected when we barely talk throughout the day.",
        "I want us to plan more activities together.",
        "I sometimes feel like spending time together is an obligation.",
        "I miss feeling like a priority in your day."
    ]'::jsonb,
    'unliking',
    '⏰'
),

(
    'Affection & Intimacy',
    '[
        "I feel like we have become less affectionate.",
        "I miss receiving random hugs and kisses.",
        "I sometimes need more physical affection.",
        "I miss our romantic moments.",
        "I feel like we have stopped expressing love in little ways.",
        "I want us to be more intentional about romance.",
        "I miss feeling desired and appreciated.",
        "I wish we initiated affection more equally.",
        "I feel like our relationship has become too routine.",
        "I want us to reconnect romantically."
    ]'::jsonb,
    'unliking',
    '🥀'
),

(
    'Effort & Responsibilities',
    '[
        "I feel like I am putting more effort into our relationship.",
        "I wish you would take more initiative.",
        "I feel like household responsibilities are not equally shared.",
        "I sometimes feel that my efforts go unnoticed.",
        "I want us to contribute more equally to our relationship.",
        "I feel like I have to remind you about things repeatedly.",
        "I wish you would take more responsibility without being asked.",
        "I feel tired of always planning everything.",
        "I want us to work together instead of relying on one person.",
        "I need to see more consistent effort from both of us."
    ]'::jsonb,
    'unliking',
    '⚖️'
),

(
    'Trust & Insecurity',
    '[
        "I sometimes feel insecure in our relationship.",
        "I struggle when things are not communicated clearly.",
        "I feel uncomfortable when promises are repeatedly broken.",
        "I need more consistency to feel secure.",
        "Sometimes I overthink because I do not have enough reassurance.",
        "I feel worried when important things are hidden from me.",
        "I want us to be more transparent with each other.",
        "I feel like my trust has been affected by certain actions.",
        "I need us to rebuild trust in some areas.",
        "I want to feel more emotionally secure with you."
    ]'::jsonb,
    'unliking',
    '🫶'
),

(
    'Arguments & Conflict',
    '[
        "I feel hurt by the way we argue sometimes.",
        "I do not like when disagreements turn into personal attacks.",
        "I feel like we focus on winning instead of understanding.",
        "I wish we could resolve arguments more calmly.",
        "I feel uncomfortable when we stop talking after an argument.",
        "I need some time to process things before discussing them.",
        "I feel like certain issues keep coming back without resolution.",
        "I do not like when my feelings are dismissed during disagreements.",
        "I want us to avoid bringing up old mistakes unnecessarily.",
        "I want us to handle disagreements as a team."
    ]'::jsonb,
    'unliking',
    '🌧️'
),

(
    'Feeling Unappreciated',
    '[
        "I sometimes feel that my efforts are taken for granted.",
        "I wish you would acknowledge the little things I do.",
        "I feel like my contributions go unnoticed.",
        "I need more appreciation from you.",
        "Sometimes I feel that only my mistakes are noticed.",
        "I wish you would express gratitude more often.",
        "I feel like I am not being celebrated for my achievements.",
        "I want my efforts to matter to you.",
        "I sometimes feel invisible despite trying my best.",
        "I need to feel valued in our relationship."
    ]'::jsonb,
    'unliking',
    '🥺'
),

(
    'Personal Space & Boundaries',
    '[
        "I sometimes need more personal space.",
        "I feel uncomfortable when my boundaries are not respected.",
        "I want more independence in certain areas of my life.",
        "I need you to respect my alone time.",
        "I feel pressured when I cannot say no comfortably.",
        "I want us to respect each other’s individual interests.",
        "I sometimes feel overwhelmed by expectations.",
        "I need more understanding when I ask for space.",
        "I want to feel free to express my own opinions.",
        "I think we need to discuss our personal boundaries."
    ]'::jsonb,
    'unliking',
    '🧩'
),

(
    'Daily Life & Habits',
    '[
        "I feel stressed when everyday responsibilities are not shared.",
        "Some of our daily habits are bothering me.",
        "I wish we were more organised together.",
        "I feel frustrated when small tasks are repeatedly forgotten.",
        "I want us to build healthier routines together.",
        "I feel like our schedules leave too little room for each other.",
        "I wish we discussed everyday responsibilities more clearly.",
        "Sometimes our routines make us feel disconnected.",
        "I want more cooperation in our daily lives.",
        "I feel overwhelmed by some of our everyday responsibilities."
    ]'::jsonb,
    'unliking',
    '🏠'
),

(
    'Expectations & Future',
    '[
        "I feel uncertain about some aspects of our future.",
        "I think we need to discuss our long-term goals.",
        "Sometimes our expectations do not match.",
        "I feel anxious when important future decisions are unclear.",
        "I want us to talk more about our plans.",
        "I feel like we have different priorities in some areas.",
        "I need more clarity about certain commitments.",
        "I worry that we are not preparing for the future together.",
        "I want us to understand each other’s expectations better.",
        "I feel like we should make more decisions as a team."
    ]'::jsonb,
    'unliking',
    '🔮'
),

(
    'Feeling Disconnected',
    '[
        "I feel like we are growing emotionally distant.",
        "I miss the way we used to connect.",
        "Sometimes it feels like we are just going through our routines.",
        "I feel like we have less in common lately.",
        "I miss sharing the little details of my day with you.",
        "I wish we were more curious about each other.",
        "I feel like we are not as emotionally close as before.",
        "I miss the excitement we used to share.",
        "I want us to rediscover things we enjoy together.",
        "I want to feel connected to you again."
    ]'::jsonb,
    'unliking',
    '🌙'
),

(
    'Other Feelings',
    '[
        "I feel lost and I am not sure how to explain it.",
        "Something has been bothering me lately.",
        "I am feeling overwhelmed and need your understanding.",
        "I am having a difficult day and need some support.",
        "I feel sad but I cannot identify the exact reason.",
        "I need to share something that has been on my mind.",
        "I am struggling with something personal.",
        "I feel frustrated and would like to talk about it.",
        "I need some patience and understanding right now.",
        "I am not feeling like myself lately."
    ]'::jsonb,
    'unliking',
    '☁️'
);



-- Enable RLS
ALTER TABLE public.predefined_messages
ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can read predefined messages"
ON public.predefined_messages
FOR SELECT
TO anon, authenticated
USING (true);

-- Grant SELECT permission
GRANT SELECT ON TABLE public.predefined_messages
TO anon, authenticated;

