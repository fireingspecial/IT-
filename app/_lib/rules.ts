export type RegionName =
  | '수도권'
  | '강원권'
  | '충청·세종'
  | '전라·광주'
  | '경상·대구·부산'
  | '제주·도서'

export type CityId =
  // 수도권
  | 'seoul'
  | 'incheon'
  | 'suwon'
  | 'seongnam'
  | 'goyang'
  | 'yongin'
  | 'bucheon'
  | 'ansan'
  | 'pyeongtaek'
  | 'uijeongbu'
  | 'paju'
  | 'gimpo'
  | 'hwaseong'
  // 강원권
  | 'chuncheon'
  | 'wonju'
  | 'gangneung'
  | 'sokcho'
  | 'donghae'
  | 'pyeongchang'
  | 'taebaek'
  // 충청·세종
  | 'daejeon'
  | 'sejong'
  | 'cheongju'
  | 'cheonan'
  | 'asan'
  | 'chungju'
  | 'seosan'
  | 'gongju'
  // 전라·광주
  | 'gwangju'
  | 'jeonju'
  | 'iksan'
  | 'gunsan'
  | 'mokpo'
  | 'yeosu'
  | 'suncheon'
  | 'naju'
  // 경상·대구·부산·울산
  | 'busan'
  | 'daegu'
  | 'ulsan'
  | 'changwon'
  | 'gimhae'
  | 'jinju'
  | 'pohang'
  | 'gyeongju'
  | 'gumi'
  | 'andong'
  | 'geoje'
  | 'tongyeong'
  // 제주·도서
  | 'jeju'
  | 'seogwipo'
  | 'ulleung'

export type City = {
  id: CityId
  name: string
  region: RegionName
  lat: number
  lon: number
}

export const CITIES: City[] = [
  // 수도권
  { id: 'seoul', name: '서울', region: '수도권', lat: 37.5665, lon: 126.978 },
  { id: 'incheon', name: '인천', region: '수도권', lat: 37.4563, lon: 126.7052 },
  { id: 'suwon', name: '수원', region: '수도권', lat: 37.2636, lon: 127.0286 },
  { id: 'seongnam', name: '성남(분당)', region: '수도권', lat: 37.4201, lon: 127.1265 },
  { id: 'goyang', name: '고양(일산)', region: '수도권', lat: 37.6584, lon: 126.832 },
  { id: 'yongin', name: '용인', region: '수도권', lat: 37.2411, lon: 127.1776 },
  { id: 'bucheon', name: '부천', region: '수도권', lat: 37.5034, lon: 126.766 },
  { id: 'ansan', name: '안산', region: '수도권', lat: 37.3219, lon: 126.8309 },
  { id: 'pyeongtaek', name: '평택', region: '수도권', lat: 36.9921, lon: 127.1129 },
  { id: 'uijeongbu', name: '의정부', region: '수도권', lat: 37.7381, lon: 127.0337 },
  { id: 'paju', name: '파주', region: '수도권', lat: 37.7599, lon: 126.7803 },
  { id: 'gimpo', name: '김포', region: '수도권', lat: 37.6153, lon: 126.7155 },
  { id: 'hwaseong', name: '화성(동탄)', region: '수도권', lat: 37.1995, lon: 126.8315 },

  // 강원권
  { id: 'chuncheon', name: '춘천', region: '강원권', lat: 37.8813, lon: 127.7298 },
  { id: 'wonju', name: '원주', region: '강원권', lat: 37.3422, lon: 127.9202 },
  { id: 'gangneung', name: '강릉', region: '강원권', lat: 37.7519, lon: 128.8761 },
  { id: 'sokcho', name: '속초', region: '강원권', lat: 38.207, lon: 128.5918 },
  { id: 'donghae', name: '동해', region: '강원권', lat: 37.5248, lon: 129.1143 },
  { id: 'pyeongchang', name: '평창', region: '강원권', lat: 37.3705, lon: 128.3902 },
  { id: 'taebaek', name: '태백', region: '강원권', lat: 37.164, lon: 128.9856 },

  // 충청·세종
  { id: 'daejeon', name: '대전', region: '충청·세종', lat: 36.3504, lon: 127.3845 },
  { id: 'sejong', name: '세종', region: '충청·세종', lat: 36.4801, lon: 127.289 },
  { id: 'cheongju', name: '청주', region: '충청·세종', lat: 36.6424, lon: 127.489 },
  { id: 'cheonan', name: '천안', region: '충청·세종', lat: 36.8151, lon: 127.1139 },
  { id: 'asan', name: '아산', region: '충청·세종', lat: 36.7898, lon: 127.0018 },
  { id: 'chungju', name: '충주', region: '충청·세종', lat: 36.991, lon: 127.926 },
  { id: 'seosan', name: '서산', region: '충청·세종', lat: 36.7845, lon: 126.4503 },
  { id: 'gongju', name: '공주', region: '충청·세종', lat: 36.4465, lon: 127.119 },

  // 전라·광주
  { id: 'gwangju', name: '광주', region: '전라·광주', lat: 35.1595, lon: 126.8526 },
  { id: 'jeonju', name: '전주', region: '전라·광주', lat: 35.8242, lon: 127.148 },
  { id: 'iksan', name: '익산', region: '전라·광주', lat: 35.9483, lon: 126.9576 },
  { id: 'gunsan', name: '군산', region: '전라·광주', lat: 35.9676, lon: 126.7366 },
  { id: 'mokpo', name: '목포', region: '전라·광주', lat: 34.8118, lon: 126.3922 },
  { id: 'yeosu', name: '여수', region: '전라·광주', lat: 34.7604, lon: 127.6622 },
  { id: 'suncheon', name: '순천', region: '전라·광주', lat: 34.9507, lon: 127.4872 },
  { id: 'naju', name: '나주', region: '전라·광주', lat: 35.0161, lon: 126.7108 },

  // 경상·대구·부산·울산
  { id: 'busan', name: '부산', region: '경상·대구·부산', lat: 35.1796, lon: 129.0756 },
  { id: 'daegu', name: '대구', region: '경상·대구·부산', lat: 35.8714, lon: 128.6014 },
  { id: 'ulsan', name: '울산', region: '경상·대구·부산', lat: 35.5384, lon: 129.3114 },
  { id: 'changwon', name: '창원', region: '경상·대구·부산', lat: 35.228, lon: 128.6811 },
  { id: 'gimhae', name: '김해', region: '경상·대구·부산', lat: 35.2285, lon: 128.8894 },
  { id: 'jinju', name: '진주', region: '경상·대구·부산', lat: 35.1802, lon: 128.1076 },
  { id: 'pohang', name: '포항', region: '경상·대구·부산', lat: 36.019, lon: 129.3435 },
  { id: 'gyeongju', name: '경주', region: '경상·대구·부산', lat: 35.8562, lon: 129.2247 },
  { id: 'gumi', name: '구미', region: '경상·대구·부산', lat: 36.1195, lon: 128.3446 },
  { id: 'andong', name: '안동', region: '경상·대구·부산', lat: 36.5684, lon: 128.7294 },
  { id: 'geoje', name: '거제', region: '경상·대구·부산', lat: 34.8806, lon: 128.6211 },
  { id: 'tongyeong', name: '통영', region: '경상·대구·부산', lat: 34.8544, lon: 128.4332 },

  // 제주·도서
  { id: 'jeju', name: '제주', region: '제주·도서', lat: 33.4996, lon: 126.5312 },
  { id: 'seogwipo', name: '서귀포', region: '제주·도서', lat: 33.2541, lon: 126.5601 },
  { id: 'ulleung', name: '울릉도·독도', region: '제주·도서', lat: 37.4844, lon: 130.9056 },
]

export const REGIONS: RegionName[] = [
  '수도권',
  '강원권',
  '충청·세종',
  '전라·광주',
  '경상·대구·부산',
  '제주·도서',
]

export const DEFAULT_CITY: CityId = 'seoul'

export function isCityId(value: unknown): value is CityId {
  return typeof value === 'string' && CITIES.some((c) => c.id === value)
}

export function getCity(id: CityId): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0]
}

export type ThemeKey =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'

export type WeatherCondition = { label: string; emoji: string; theme: ThemeKey }

export function getCondition(code: number | null): WeatherCondition {
  switch (code) {
    case 0:
      return { label: '맑음', emoji: '☀️', theme: 'clear' }
    case 1:
    case 2:
      return { label: '구름 조금', emoji: '🌤️', theme: 'partly' }
    case 3:
      return { label: '흐림', emoji: '☁️', theme: 'cloudy' }
    case 45:
    case 48:
      return { label: '안개', emoji: '🌫️', theme: 'fog' }
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { label: '이슬비', emoji: '🌦️', theme: 'drizzle' }
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { label: '비', emoji: '🌧️', theme: 'rain' }
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { label: '눈', emoji: '🌨️', theme: 'snow' }
    case 95:
    case 96:
    case 99:
      return { label: '뇌우', emoji: '⛈️', theme: 'storm' }
    default:
      return { label: '알 수 없음', emoji: '🌡️', theme: 'cloudy' }
  }
}

export const DARK_THEMES: ThemeKey[] = ['drizzle', 'rain', 'storm']

export type Character = {
  hat: string | null
  head: string
  top: string
  hand: string | null
  bottom: string
  shoes: string
}

export type StyleMode = 'casual' | 'formal' | 'sporty'

export type OutfitItemDetail = {
  top: string
  bottom: string
  outer?: string
  shoes: string
  acc?: string
}

export type StyleOutfit = {
  mode: StyleMode
  name: string
  icon: string
  comment: string
  items: string[]
  details: OutfitItemDetail
  character: Character
}

export type Outfit = {
  icon: string
  items: string[]
  comment: string
  head: string
  top: string
  bottom: string
}

type TempRule = {
  min: number
  styles: Record<StyleMode, StyleOutfit>
}

const TEMP_RULES: TempRule[] = [
  // 28도 이상: 폭염 / 한여름
  {
    min: 28,
    styles: {
      casual: {
        mode: 'casual',
        name: '시원한 데일리',
        icon: '🩳',
        comment: '폭염 주의! 린넨과 통기성 좋은 옷으로 시원하게 입으세요.',
        items: ['린넨 반팔', '반바지', '버클 샌들'],
        details: {
          top: '루즈핏 린넨 반팔 셔츠',
          bottom: '버뮤다 쇼츠 / 린넨 반바지',
          shoes: '가죽 스트랩 샌들',
          acc: '자외선 차단 선글라스',
        },
        character: { hat: '🧢', head: '🥵', top: '🎽', hand: null, bottom: '🩳', shoes: '🩴' },
      },
      formal: {
        mode: 'formal',
        name: '쿨비즈 출근룩',
        icon: '👔',
        comment: '단정하지만 시원한 쿨맥스 셔츠와 린넨 슬랙스를 추천해요.',
        items: ['쿨비즈 반팔 셔츠', '린넨 슬랙스', '로퍼'],
        details: {
          top: '쿨맥스 반팔 드레스 셔츠',
          bottom: '시원한 린넨 테이퍼드 슬랙스',
          shoes: '통기성 페니 로퍼',
          acc: '가죽 브리프케이스',
        },
        character: { hat: null, head: '😎', top: '👔', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '애슬레저 / 썸머 스트릿',
        icon: '🎽',
        comment: '땀 흡수가 빠른 기능성 티셔츠와 나일론 쇼츠가 최고예요.',
        items: ['기능성 드라이 티', '나일론 트랙 쇼츠', '슬라이드'],
        details: {
          top: '오버핏 드라이핏 반팔티',
          bottom: '나일론 이지 쇼츠',
          shoes: '리커버리 슬라이드 / 가벼운 러닝화',
          acc: '방수 크로스백',
        },
        character: { hat: '🧢', head: '🥵', top: '🎽', hand: null, bottom: '🩳', shoes: '👟' },
      },
    },
  },
  // 23 ~ 27도: 초여름 / 포근한 날씨
  {
    min: 23,
    styles: {
      casual: {
        mode: 'casual',
        name: '캐주얼 썸머',
        icon: '👕',
        comment: '활동하기 딱 좋은 날씨예요. 반팔에 얇은 면바지를 매치해보세요.',
        items: ['코튼 반팔 티', '연청 와이드 팬츠', '스니커즈'],
        details: {
          top: '헤비코튼 그래픽 반팔티',
          bottom: '라이트 블루 와이드 데님',
          shoes: '화이트 캔버스 스니커즈',
          acc: '에코백 / 실버 링',
        },
        character: { hat: null, head: '😎', top: '👕', hand: null, bottom: '👖', shoes: '👟' },
      },
      formal: {
        mode: 'formal',
        name: '스마트 캐주얼',
        icon: '👔',
        comment: '얇은 긴팔 셔츠를 롤업하거나 반팔 니트로 깔끔하게 연출해요.',
        items: ['오픈카라 셔츠', '치노 팬츠', '더비 슈즈'],
        details: {
          top: '린넨 블렌드 오픈카라 셔츠',
          bottom: '크롭 테이퍼드 치노 팬츠',
          shoes: '모던 플랫 더비 슈즈',
          acc: '메탈 워치',
        },
        character: { hat: null, head: '😊', top: '👔', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '시티 스트릿',
        icon: '🛹',
        comment: '오버핏 셔츠를 아우터처럼 가볍게 걸쳐 스타일리시하게 입어요.',
        items: ['반팔 위 오픈 셔츠', '카고 하프팬츠', '스케이트 슈즈'],
        details: {
          top: '체크 반팔 셔츠 + 이너 흰티',
          bottom: '유틸리티 와이드 카고 쇼츠',
          shoes: '클래식 스케이트 슈즈',
          acc: '캠프캡',
        },
        character: { hat: '🧢', head: '😎', top: '👕', hand: null, bottom: '🩳', shoes: '👟' },
      },
    },
  },
  // 20 ~ 22도: 쾌적한 봄가을
  {
    min: 20,
    styles: {
      casual: {
        mode: 'casual',
        name: '데일리 롱슬리브',
        icon: '👔',
        comment: '바람이 솔솔 불어 기분 좋은 날씨! 얇은 가디건이나 롱슬리브가 제격이에요.',
        items: ['얇은 니트 가디건', '롱슬리브 티', '세미와이드 팬츠'],
        details: {
          top: '롱슬리브 스트라이프 티셔츠',
          bottom: '원턱 세미와이드 슬랙스',
          outer: '소프트 코튼 가디건',
          shoes: '코트 스니커즈',
          acc: '코튼 토트백',
        },
        character: { hat: null, head: '😊', top: '👔', hand: null, bottom: '👖', shoes: '👟' },
      },
      formal: {
        mode: 'formal',
        name: '모던 셔츠룩',
        icon: '👔',
        comment: '옥스포드 셔츠 하나만 단정하게 입어도 멋스러운 온도예요.',
        items: ['옥스포드 셔츠', '울 블렌드 슬랙스', '로퍼'],
        details: {
          top: '스카이블루 옥스포드 버튼다운 셔츠',
          bottom: '차콜 스트레이트 슬랙스',
          shoes: '페니 로퍼',
          acc: '가죽 벨트 & 서류 가방',
        },
        character: { hat: null, head: '😊', top: '👔', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '어반 아웃도어',
        icon: '🧢',
        comment: '가벼운 윈드브레이커와 조거팬츠로 트렌디한 무드를 뽐내보세요.',
        items: ['라이트 바람막이', '스웨트셔츠', '나일론 카고팬츠'],
        details: {
          top: '라운드넥 기본 긴팔티',
          bottom: '파라슈트 나일론 조거팬츠',
          outer: '패커블 윈드브레이커',
          shoes: '트레일 러닝화',
          acc: '나일론 백팩',
        },
        character: { hat: '🧢', head: '🙂', top: '👕', hand: null, bottom: '👖', shoes: '👟' },
      },
    },
  },
  // 17 ~ 19도: 선선한 환절기
  {
    min: 17,
    styles: {
      casual: {
        mode: 'casual',
        name: '맨투맨 & 데님',
        icon: '🧶',
        comment: '조금 쌀쌀해져요. 포근한 맨투맨이나 니트가 생각나는 계절이에요.',
        items: ['탄탄한 맨투맨', '중청 와이드 데님', '레트로 스니커즈'],
        details: {
          top: '루즈핏 로고 스웨트셔츠(맨투맨)',
          bottom: '미드블루 와이드 데님 팬츠',
          shoes: '독일군 / 레트로 스니커즈',
          acc: '미니 메신저백',
        },
        character: { hat: null, head: '🙂', top: '🧶', hand: null, bottom: '👖', shoes: '👟' },
      },
      formal: {
        mode: 'formal',
        name: '니트 베스트 & 슬랙스',
        icon: '👔',
        comment: '셔츠에 니트 베스트나 얇은 블레이저를 더하면 단정하고 따뜻해요.',
        items: ['화이트 셔츠', '니트 베스트', '테일러드 팬츠'],
        details: {
          top: '클래식 드레스 셔츠',
          bottom: '네이비 테일러드 슬랙스',
          outer: 'V넥 울 니트 베스트',
          shoes: '블랙 더비 슈즈',
          acc: '가죽 브리프케이스',
        },
        character: { hat: null, head: '🙂', top: '👔', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '후드 셋업',
        icon: '🛹',
        comment: '헤비웨이트 후드티와 편안한 스웨트팬츠로 힙하게 연출해요.',
        items: ['도톰한 후드티', '스웨트 조거팬츠', '볼드 스니커즈'],
        details: {
          top: '헤비코튼 오버사이즈 후드티',
          bottom: '셋업 스웨트 조거팬츠',
          shoes: '볼드 레트로 농구화',
          acc: '비니 / 힙색',
        },
        character: { hat: null, head: '😎', top: '🧥', hand: null, bottom: '👖', shoes: '👟' },
      },
    },
  },
  // 12 ~ 16도: 쌀쌀함 / 자켓 필수
  {
    min: 12,
    styles: {
      casual: {
        mode: 'casual',
        name: '자켓 & 가디건 레이어드',
        icon: '🧥',
        comment: '일교차가 심해요! 가벼운 자켓, 트러커, 도톰한 가디건을 꼭 챙기세요.',
        items: ['데님/스웨이드 자켓', '도톰 니트', '스트레이트 팬츠'],
        details: {
          top: '크루넥 파인 울 니트',
          bottom: '워싱 코튼 치노 팬츠',
          outer: '데님 트러커 자켓 / 해링턴 자켓',
          shoes: '스웨이드 첼시부츠 / 스니커즈',
          acc: '울 머플러(가방에 소지)',
        },
        character: { hat: null, head: '😌', top: '🧥', hand: null, bottom: '👖', shoes: '👞' },
      },
      formal: {
        mode: 'formal',
        name: '클래식 블레이저',
        icon: '🧥',
        comment: '울 블레이저와 목폴라 니트의 조합으로 세련된 가을 출근룩을 완성해요.',
        items: ['테일러드 블레이저', '모크넥 니트', '슬랙스'],
        details: {
          top: '소프트 모크넥 하프 니트',
          bottom: '울 블렌드 플리츠 슬랙스',
          outer: '싱글 브레스티드 테일러드 자켓',
          shoes: '스트레이트 팁 로퍼',
          acc: '실크 포켓스퀘어',
        },
        character: { hat: null, head: '😌', top: '🧥', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '워크웨어 / 야상 룩',
        icon: '🧥',
        comment: '활동하기 편한 필드 자켓이나 아노락으로 감성적인 워크웨어를 연출해보세요.',
        items: ['M65 필드 자켓(야상)', '와이드 카고', '워커'],
        details: {
          top: '와플 롱슬리브 티셔츠',
          bottom: '립스탑 와이드 카고 팬츠',
          outer: 'M-65 필드 자켓 / 웜 윈드브레이커',
          shoes: '러기드 6인치 부츠',
          acc: '코듀로이 볼캡',
        },
        character: { hat: '🧢', head: '😌', top: '🧥', hand: null, bottom: '👖', shoes: '🥾' },
      },
    },
  },
  // 9 ~ 11도: 꽤 추움 / 코트·점퍼
  {
    min: 9,
    styles: {
      casual: {
        mode: 'casual',
        name: '트렌치 & 점퍼',
        icon: '🧥',
        comment: '찬 바람이 옷깃을 파고들어요. 트렌치코트나 블루종 점퍼를 입으세요.',
        items: ['트렌치코트', '터틀넥 니트', '기모 데님'],
        details: {
          top: '캐시미어 혼방 터틀넥 니트',
          bottom: '다크 인디고 기모 데님',
          outer: '오버핏 더블 트렌치코트',
          shoes: '레더 더비 슈즈',
          acc: '체크 울 머플러',
        },
        character: { hat: null, head: '😗', top: '🧥', hand: null, bottom: '👖', shoes: '👞' },
      },
      formal: {
        mode: 'formal',
        name: '비즈니스 오버코트',
        icon: '🧥',
        comment: '가벼운 핸드메이드 울 코트나 퀼팅 자켓으로 보온성과 격식을 챙기세요.',
        items: ['핸드메이드 코트', '수트 셋업', '드레스 슈즈'],
        details: {
          top: '파인 울 니트 + 셔츠 레이어드',
          bottom: '셋업 울 트라우저',
          outer: '싱글 체스터 울 코트',
          shoes: '블랙 옥스포드화',
          acc: '캐시미어 머플러',
        },
        character: { hat: null, head: '😗', top: '🧥', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '헤비 플리스 & MA-1',
        icon: '🧥',
        comment: '따뜻한 보아 플리스 자켓이나 항공점퍼(MA-1)로 스트릿 무드를 내보세요.',
        items: ['항공점퍼(MA-1)', '후드집업', '기모 조거팬츠'],
        details: {
          top: '기모 안감 후디',
          bottom: '헤비웨이트 조거 스웨트팬츠',
          outer: '패딩 충전재 MA-1 항공점퍼',
          shoes: '하이탑 스니커즈',
          acc: '니트 비니',
        },
        character: { hat: null, head: '😗', top: '🧥', hand: null, bottom: '👖', shoes: '👟' },
      },
    },
  },
  // 5 ~ 8도: 초겨울 추위 / 두툼한 코트·숏패딩
  {
    min: 5,
    styles: {
      casual: {
        mode: 'casual',
        name: '숏패딩 & 코트',
        icon: '🧥',
        comment: '추위가 시작됐어요! 두툼한 울코트나 트렌디한 숏패딩을 꺼낼 때입니다.',
        items: ['덕다운 숏패딩', '도툼한 기모니트', '코듀로이 팬츠'],
        details: {
          top: '헤비 울 케이블 니트 + 발열내의',
          bottom: '와이드 코듀로이(골덴) 팬츠',
          outer: '미니멀 덕다운 숏패딩',
          shoes: '어그 / 스웨이드 부츠',
          acc: '울 장갑 & 비니',
        },
        character: { hat: null, head: '😬', top: '🧥', hand: null, bottom: '👖', shoes: '🥾' },
      },
      formal: {
        mode: 'formal',
        name: '헤비 울코트 룩',
        icon: '🧥',
        comment: '도톰한 캐시미어 블렌드 코트 안에 히트텍을 챙겨입으면 든든해요.',
        items: ['더블 롱코트', '캐시미어 니트', '기모 슬랙스'],
        details: {
          top: '캐시미어 터틀넥 + 히트텍',
          bottom: '본딩 기모 프레스 슬랙스',
          outer: '프리미엄 더블 롱 울코트',
          shoes: '레더 첼시부츠',
          acc: '캐시미어 100 머플러',
        },
        character: { hat: null, head: '😬', top: '🧥', hand: null, bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '다운 자켓 & 고프코어',
        icon: '🧥',
        comment: '보온성 높은 고프코어 패딩과 기능성 방한 팬츠로 완벽 무장해요.',
        items: ['볼륨 다운 자켓', '방풍 트레이닝 팬츠', '트레킹화'],
        details: {
          top: '기모 풀집업 + 테크니컬 베이스레이어',
          bottom: '방풍 안감 카고 트랙팬츠',
          outer: '방수 방풍 하이넥 다운 점퍼',
          shoes: '고어텍스 방한 트레킹화',
          acc: '방한 군밤모자 / 플리스 넥워머',
        },
        character: { hat: '🧢', head: '😬', top: '🧥', hand: null, bottom: '👖', shoes: '🥾' },
      },
    },
  },
  // 5도 미만: 혹한 / 한파
  {
    min: Number.NEGATIVE_INFINITY,
    styles: {
      casual: {
        mode: 'casual',
        name: '헤비 롱패딩 무장',
        icon: '🧤',
        comment: '꽁꽁 얼어붙는 날씨예요! 롱패딩, 목도리, 장갑 등 방한용품 총출동하세요.',
        items: ['헤비 롱패딩', '기모 후드', '기모 조거팬츠', '목도리'],
        details: {
          top: '초극세사 기모 후드티 + 히트텍 엑스트라웜',
          bottom: '본딩 기모 방한 팬츠',
          outer: '헤비 구스다운 롱패딩',
          shoes: '방한 패딩 부츠',
          acc: '두툼한 머플러, 터치 장갑',
        },
        character: { hat: null, head: '🥶', top: '🧥🧣', hand: '🧤', bottom: '👖', shoes: '🥾' },
      },
      formal: {
        mode: 'formal',
        name: '비즈니스 패딩코트',
        icon: '🧤',
        comment: '추운 날 출근길엔 보온 충전재가 들어간 패딩 코트와 머플러가 필수예요.',
        items: ['다운 패딩코트', '터틀넥', '기모 정장바지', '가죽장갑'],
        details: {
          top: '메리노울 하이넥 니트 + 방한 내의',
          bottom: '방풍 울 슬랙스',
          outer: '구스다운 비즈니스 패딩 코트',
          shoes: '보온 안감 가죽 첼시부츠',
          acc: '스마트폰 터치 가죽장갑, 캐시미어 머플러',
        },
        character: { hat: null, head: '🥶', top: '🧥🧣', hand: '🧤', bottom: '👖', shoes: '👞' },
      },
      sporty: {
        mode: 'sporty',
        name: '익스트림 익스플로러',
        icon: '🧤',
        comment: '한파에도 끄떡없는 헤비 익스페디션 다운과 방한 액세서리로 대비하세요.',
        items: ['대장급 헤비 다운', '방한 기모 팬츠', '방한화', '바라클라바'],
        details: {
          top: '폴라텍 플리스 집업 + 기능성 방한 이너',
          bottom: '다운 충전재 방한 팬츠',
          outer: '윈드스토퍼 헤비 익스페디션 다운 파카',
          shoes: '스노우 부츠 / 방한 트레킹 슈즈',
          acc: '방한 바라클라바 / 윈터 이어머프',
        },
        character: { hat: '🧢', head: '🥶', top: '🧥🧣', hand: '🧤', bottom: '👖', shoes: '🥾' },
      },
    },
  },
]

export function getOutfitStyles(feels: number): Record<StyleMode, StyleOutfit> {
  const matched = TEMP_RULES.find((r) => feels >= r.min) ?? TEMP_RULES[TEMP_RULES.length - 1]
  return matched.styles
}

export function getOutfit(feels: number): Outfit {
  const casual = getOutfitStyles(feels).casual
  return {
    icon: casual.icon,
    items: casual.items,
    comment: casual.comment,
    head: casual.character.head,
    top: casual.character.top,
    bottom: casual.character.bottom,
  }
}

export function getGaugeFace(feels: number): string {
  if (feels <= 4) return '🥶'
  if (feels <= 16) return '😌'
  if (feels <= 22) return '😊'
  if (feels <= 27) return '😎'
  return '🥵'
}

export const GAUGE_MIN = -10
export const GAUGE_MAX = 35

export function getGaugePercent(feels: number): number {
  const clamped = Math.min(GAUGE_MAX, Math.max(GAUGE_MIN, feels))
  return ((clamped - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100
}

export const THRESHOLDS = { pop: 60, wind: 30, uv: 6 } as const

export type WeatherData = {
  code: number | null
  temp: number | null
  feels: number | null
  humidity: number | null
  precipitation: number | null
  wind: number | null
  max: number | null
  min: number | null
  pop: number | null
  uv: number | null
}

export type Recommendation = {
  condition: WeatherCondition
  feels: number
  outfit: Outfit // 레거시 호환
  styles: Record<StyleMode, StyleOutfit> // 다양한 스타일 코디
  weatherTips: string[] // 날씨 맞춤형 코디 팁 (비, 눈, 바람, 자외선)
  badges: string[]
  character: Character
  gaugeFace: string
  gaugePercent: number
}

const round = (v: number | null) => (v == null ? null : Math.round(v))

export function recommend(data: WeatherData): Recommendation {
  const condition = getCondition(data.code)
  const feels = Math.round(data.feels ?? data.temp ?? 0)
  const baseStyles = getOutfitStyles(feels)

  const pop = round(data.pop)
  const wind = round(data.wind)
  const uv = round(data.uv)
  const max = round(data.max)
  const min = round(data.min)

  const isWet =
    condition.theme === 'rain' ||
    condition.theme === 'storm' ||
    condition.theme === 'drizzle'
  const umbrellaMust = isWet || (pop != null && pop >= THRESHOLDS.pop)
  const umbrellaFoldable = !umbrellaMust && pop != null && pop >= 30 && pop <= 59
  const isSnow = condition.theme === 'snow'
  const bigGap = max != null && min != null && max - min >= 10
  const windy = wind != null && wind >= THRESHOLDS.wind
  const strongUv = uv != null && uv >= THRESHOLDS.uv

  const badges: string[] = []
  if (umbrellaMust) badges.push('☂️ 우산 필수')
  else if (umbrellaFoldable) badges.push('🌂 접이식 우산 추천')
  if (isSnow) badges.push('❄️ 미끄럼 주의 신발')
  if (bigGap) badges.push('🧣 일교차 커요, 겉옷 챙기기')
  if (windy) badges.push('🌬️ 바람 강해요, 바람막이 추천')
  if (strongUv) badges.push('🧴 자외선 강해요, 선크림·모자')

  const weatherTips: string[] = []
  if (umbrellaMust) {
    weatherTips.push('🌧️ 빗물이 튈 수 있으니 밑단이 끌리지 않는 바지와 방수 신발을 추천해요.')
  }
  if (isSnow) {
    weatherTips.push('❄️ 눈길에 미끄러지지 않도록 바닥 홈이 깊은 방한화나 부츠를 신으세요.')
  }
  if (windy) {
    weatherTips.push('💨 돌풍이 부니 모자가 날아가지 않게 조심하고 방풍 겉옷이 유용해요.')
  }
  if (bigGap) {
    weatherTips.push('🌡️ 낮밤 기온차가 커요. 입고 벗기 편한 가디건이나 셔츠 레이어드를 추천해요.')
  }
  if (strongUv) {
    weatherTips.push('☀️ 햇빛이 강렬해요. 린넨 긴팔이나 볼캡으로 직사광선을 피하세요.')
  }

  const hand = isSnow ? '🧤' : umbrellaMust ? '☂️' : umbrellaFoldable ? '🌂' : null

  // 날씨 악천후에 따른 캐릭터 슈즈/핸드 보정
  const adjustedStyles: Record<StyleMode, StyleOutfit> = {
    casual: {
      ...baseStyles.casual,
      character: {
        ...baseStyles.casual.character,
        hat: strongUv ? '🧢' : baseStyles.casual.character.hat,
        hand,
        shoes: isSnow || umbrellaMust ? '🥾' : baseStyles.casual.character.shoes,
      },
    },
    formal: {
      ...baseStyles.formal,
      character: {
        ...baseStyles.formal.character,
        hand,
        shoes: isSnow || umbrellaMust ? '🥾' : baseStyles.formal.character.shoes,
      },
    },
    sporty: {
      ...baseStyles.sporty,
      character: {
        ...baseStyles.sporty.character,
        hat: strongUv ? '🧢' : baseStyles.sporty.character.hat,
        hand,
        shoes: isSnow || umbrellaMust ? '🥾' : baseStyles.sporty.character.shoes,
      },
    },
  }

  const casualOutfit = adjustedStyles.casual
  const outfit: Outfit = {
    icon: casualOutfit.icon,
    items: casualOutfit.items,
    comment: casualOutfit.comment,
    head: casualOutfit.character.head,
    top: casualOutfit.character.top,
    bottom: casualOutfit.character.bottom,
  }

  return {
    condition,
    feels,
    outfit,
    styles: adjustedStyles,
    weatherTips,
    badges,
    character: casualOutfit.character,
    gaugeFace: getGaugeFace(feels),
    gaugePercent: getGaugePercent(feels),
  }
}

export const TAP_PHRASES = [
  '간지러워요 😆',
  '오늘 이 스타일 어때요? ✨',
  '다른 룩도 구경해보세요!',
  '거울 보는 중… 🪞',
  '출발 준비 완료! 🚀',
  '날씨에 딱 맞췄어요! 💯',
]
