// initialData.js - Dữ liệu hạt giống cho Portfolio Nhiếp Ảnh & Học Viện Đào Tạo Y Võ Visual

export const PHOTOGRAPHER_INFO = {
  name: "Y Võ",
  fullName: "Y Võ Visual",
  title: "Visual Artist & Master Photographer",
  subtitle: "Sony Artisan of Imagery | Leica Ambassador Vietnam",
  tagline: "Bắt trọn linh hồn của ánh sáng & Kể những câu chuyện vượt thời gian.",
  bio: "Với hơn 14 năm thực chiến trong ngành nhiếp ảnh nghệ thuật và thương mại, tác phẩm của Y Võ Visual từng xuất hiện trên Vogue Italia, Harper's Bazaar, Elle và National Geographic Vietnam. Với tôn chỉ 'Ánh sáng là linh hồn của bức ảnh', Y Võ đã truyền cảm hứng và đào tạo hơn 12.000 nhiếp ảnh gia trên khắp cả nước.",
  avatar: "./photographer.jpg",
  heroBg: "./hero-bg.jpg",
  stats: [
    { value: "14+", label: "Năm Làm Nghề" },
    { value: "500+", label: "Bộ Ảnh Cưới & Bìa Báo" },
    { value: "12.000+", label: "Học Viên Đào Tạo" },
    { value: "18", label: "Giải Thưởng Quốc Tế" }
  ],
  quote: "Nhiếp ảnh không chỉ là ghi lại hình dáng của đối tượng, mà là nắm bắt khoảnh khắc cảm xúc thăng hoa nhất trước khi nó tan biến vào hư không.",
  gearList: [
    "Sony A7R V (61 Megapixels)",
    "Hasselblad X2D 100C Medium Format",
    "Leica M11 Rangefinder",
    "Ống kính: 50mm f/1.2 GM, 85mm f/1.4 GM, 35mm Summilux",
    "Hệ thống đèn: Profoto B10X Plus & A10 AirTTL"
  ],
  bankAccount: {
    bankName: "Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)",
    accountNumber: "1903 8888 6688",
    accountHolder: "Y VO",
    branch: "Hội sở Hà Nội"
  }
};

export const INITIAL_ALBUMS = [
  { id: 'wedding', label: 'Cưới & Phóng Sự' },
  { id: 'portrait', label: 'Chân Dung Nghệ Thuật' },
  { id: 'landscape', label: 'Phong Cảnh' },
  { id: 'commercial', label: 'Thời Trang & Editorial' },
  { id: 'street', label: 'Đời Thường' }
];

export const INITIAL_PHOTOS = [
  {
    id: "p1",
    title: "Khoảnh Khắc Hoàng Hôn Sapa",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Sony A7R V",
    lens: "FE 50mm F1.2 GM",
    settings: {
      aperture: "f/1.4",
      shutter: "1/800s",
      iso: "100",
      focalLength: "50mm"
    },
    location: "Đỉnh đèo Ô Quy Hồ, Sapa, Lào Cai",
    story: "Chụp vào khoảnh khắc ánh hoàng hôn cuối cùng nhuộm vàng biển mây. Cơn gió lạnh 9°C làm tà váy cô dâu bay tự nhiên, tạo nên khung cảnh lãng mạn như tranh vẽ cổ điển.",
    featured: true,
    likes: 342,
    date: "2026-03-12"
  },
  {
    id: "p2",
    title: "Nữ Hoàng Ánh Sáng - Chiaroscuro",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Hasselblad X2D 100C",
    lens: "XCD 80mm f/1.9",
    settings: {
      aperture: "f/2.0",
      shutter: "1/250s",
      iso: "64",
      focalLength: "80mm"
    },
    location: "Studio Y Võ Visual, Tây Hồ, Hà Nội",
    story: "Sử dụng kỹ thuật ánh sáng Rembrandt với 1 đèn Profoto B10X kết hợp chóa Beauty Dish 70cm và lưới tổ ong, làm nổi bật đường nét kiêu sa và đôi mắt có chiều sâu vô cực.",
    featured: true,
    likes: 518,
    date: "2026-04-05"
  },
  {
    id: "p3",
    title: "Bình Minh Kỳ Vĩ Trên Sóng Mây Tà Xùa",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    camera: "Sony A7R V",
    lens: "FE 16-35mm F2.8 GM II",
    settings: {
      aperture: "f/8.0",
      shutter: "1/30s (Tripod)",
      iso: "50",
      focalLength: "21mm"
    },
    location: "Sống Lưng Khủng Long, Tà Xùa, Sơn La",
    story: "Đoàn leo núi thức dậy từ 4h sáng. Bức ảnh được chụp ở kỹ thuật phơi sáng kép (Exposure Blending) để giữ trọn vẹn dải dynamic range từ tia nắng mặt trời đến thung lũng mây.",
    featured: true,
    likes: 429,
    date: "2026-01-20"
  },
  {
    id: "p4",
    title: "Editorial Haute Couture: Sắc Đỏ Quyền Lực",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Leica M11",
    lens: "Summilux-M 35mm f/1.4 ASPH",
    settings: {
      aperture: "f/1.4",
      shutter: "1/1000s",
      iso: "125",
      focalLength: "35mm"
    },
    location: "Nhà hát Lớn Hà Nội",
    story: "Bộ sưu tập thu đông của NTK Hoàng Hải. Tận dụng tương phản giữa chiếc đầm dạ hội đỏ thắm và kiến trúc cổ điển Pháp với ánh sáng tự nhiên hắt qua cửa sổ vòm.",
    featured: true,
    likes: 671,
    date: "2026-02-14"
  },
  {
    id: "p5",
    title: "Nụ Cười Vĩnh Cửu - Elopement Hội An",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Sony A7R V",
    lens: "FE 85mm F1.4 GM II",
    settings: {
      aperture: "f/1.4",
      shutter: "1/640s",
      iso: "100",
      focalLength: "85mm"
    },
    location: "Phố cổ Hội An, Quảng Nam",
    story: "Bức ảnh phóng sự cưới hoàn toàn không dàn xếp (Candid Moment). Chú rể nhìn cô dâu trong tà áo dài truyền thống dưới ánh lồng đèn lung linh lúc chập tối.",
    featured: false,
    likes: 298,
    date: "2026-05-18"
  },
  {
    id: "p6",
    title: "Hồn Cổ Trầm Mặc - Chân Dung Thiếu Nữ",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Leica SL2",
    lens: "APO-Summicron-SL 75mm f/2 ASPH",
    settings: {
      aperture: "f/2.0",
      shutter: "1/320s",
      iso: "100",
      focalLength: "75mm"
    },
    location: "Cố Đô Huế",
    story: "Tone màu phim Kodak Portra 400 được tinh chỉnh riêng. Ánh mắt đượm buồn nhìn xa xăm gợi lên vẻ đẹp e ấp của người con gái xứ Huế.",
    featured: false,
    likes: 384,
    date: "2026-06-02"
  },
  {
    id: "p7",
    title: "Thung Lũng Bắc Sơn Mùa Lúa Chín",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    camera: "Sony A7R V",
    lens: "FE 24-70mm F2.8 GM II",
    settings: {
      aperture: "f/11",
      shutter: "1/60s",
      iso: "100",
      focalLength: "35mm"
    },
    location: "Đỉnh Nà Lay, Lạng Sơn",
    story: "Những mảng màu lúa chín đan xen như bàn cờ thiên nhiên dưới chân núi đá vôi hùng vĩ khi nắng sớm rọi qua sương mù mỏng.",
    featured: false,
    likes: 312,
    date: "2026-07-10"
  },
  {
    id: "p8",
    title: "Chiến Dịch Nước Hoa Luxury Noir",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "square",
    camera: "Hasselblad X2D 100C",
    lens: "XCD 120mm f/3.5 Macro",
    settings: {
      aperture: "f/16",
      shutter: "1/125s",
      iso: "64",
      focalLength: "120mm"
    },
    location: "Studio Y Võ Visual High-End Commercial",
    story: "Chụp macro sản phẩm với kỹ thuật Focus Stacking 28 tấm ghép lại để đạt độ nét sâu hoàn hảo từ nắp chai kim loại đến giọt sương bắn ra trong không trung.",
    featured: true,
    likes: 456,
    date: "2026-08-01"
  },
  {
    id: "p9",
    title: "Vũ Điệu Ánh Sáng Phố Đêm Sài Gòn",
    category: "street",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    camera: "Leica M11",
    lens: "Summilux-M 35mm f/1.4",
    settings: {
      aperture: "f/1.4",
      shutter: "1/125s",
      iso: "1600",
      focalLength: "35mm"
    },
    location: "Đại lộ Nguyễn Huệ, TP. Hồ Chí Minh",
    story: "Cơn mưa rào bất chợt biến mặt đường thành tấm gương phản chiếu hàng triệu ánh đèn neon rực rỡ của thành phố không ngủ.",
    featured: false,
    likes: 275,
    date: "2026-08-25"
  },
  {
    id: "p10",
    title: "Lời Thề Trong Nhà Thờ Cổ",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Sony A7R V",
    lens: "FE 35mm F1.4 GM",
    settings: {
      aperture: "f/1.8",
      shutter: "1/400s",
      iso: "400",
      focalLength: "35mm"
    },
    location: "Nhà thờ Đá Phát Diệm, Ninh Bình",
    story: "Tia nắng xuyên qua cửa kính màu (God Rays) chiếu đúng vào vị trí trao nhẫn của đôi uyên ương, tạo nên không khí thiêng liêng đến nghẹt thở.",
    featured: true,
    likes: 580,
    date: "2026-09-02"
  },
  {
    id: "p11",
    title: "Ánh Nhìn Điện Ảnh - Cinematic Noir",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    camera: "Sony A7R V",
    lens: "FE 85mm F1.4 GM II",
    settings: {
      aperture: "f/1.4",
      shutter: "1/500s",
      iso: "100",
      focalLength: "85mm"
    },
    location: "Studio Y Võ Visual, Hà Nội",
    story: "Phong cách ánh sáng hard-light điện ảnh lấy cảm hứng từ các bộ phim của đạo diễn Christopher Nolan và Vương Gia Vệ.",
    featured: false,
    likes: 410,
    date: "2026-09-15"
  },
  {
    id: "p12",
    title: "Sóng Bạc Vịnh Lan Hạ",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    camera: "Sony A7R V",
    lens: "FE 70-200mm F2.8 GM OSS II",
    settings: {
      aperture: "f/8.0",
      shutter: "1/200s",
      iso: "100",
      focalLength: "135mm"
    },
    location: "Vịnh Lan Hạ, Cát Bà, Hải Phòng",
    story: "Con thuyền nan nhỏ bé giữa lòng vịnh ngọc bích phẳng lặng như gương, được bao bọc bởi những khối núi đá vôi ngàn năm tuổi.",
    featured: false,
    likes: 367,
    date: "2026-09-20"
  }
];

export const INITIAL_COURSES = [
  {
    id: "course-lighting-mastery",
    title: "Masterclass: Nghệ Thuật Ánh Sáng & Bố Cục Chân Dung Đỉnh Cao",
    subtitle: "Làm chủ từ ánh sáng tự nhiên đến setup đa nguồn sáng Studio Chiaroscuro chuẩn Hollywood",
    category: "portrait",
    badge: "Bán chạy nhất",
    level: "Trung cấp - Master",
    studentsCount: 4820,
    rating: 4.96,
    reviewsCount: 642,
    originalPrice: 3500000,
    salePrice: 1890000,
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "18 giờ học • 24 bài giảng 4K",
    instructor: "Nhiếp ảnh gia Y Võ",
    description: "Khóa học độc quyền giải mã toàn bộ bí quyết tạo nên những bức ảnh chân dung triệu view. Bạn sẽ không còn phải chụp mò mẫm hay phụ thuộc vào may rủi, mà hoàn toàn làm chủ hướng sáng, chất lượng ánh sáng, tỉ lệ tương phản và tâm lý giao tiếp giúp mẫu thăng hoa trước ống kính.",
    whatYouWillLearn: [
      "Hiểu sâu về 5 mô hình ánh sáng kinh điển: Rembrandt, Loop, Split, Butterfly & Broad lighting",
      "Làm chủ các loại modifier: Softbox, Octabox, Parabolic Umbrellas, Beauty Dish và Grids",
      "Bố cục điện ảnh: Tỉ lệ vàng Fibonacci, Leading Lines, Đóng khung thị giác & Phá vỡ quy tắc",
      "Giao tiếp và hướng dẫn tạo dáng tự nhiên cho cả người mẫu chuyên nghiệp lẫn khách hàng chưa từng đứng trước máy",
      "Kỹ thuật xử lý da cao cấp (Frequency Separation & Micro Dodge/Burn) mà không làm mất chất liệu da",
      "Bonus: Nhận trọn bộ 20 Cinematic Portrait Presets trị giá 1.200.000₫"
    ],
    prerequisites: "Có máy ảnh có chế độ Manual (M) và cơ bản biết về Khẩu - Tốc - ISO.",
    modules: [
      {
        id: "m1",
        title: "Chương 1: Bản Chất Thị Giác & Ngôn Ngữ Của Ánh Sáng",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Giới thiệu khóa học & Tư duy của một Visual Storyteller",
            duration: "15:20",
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            hasAttachment: true,
            attachmentName: "Ebook_Tu_Duy_Anh_Sang_MinhVu.pdf"
          },
          {
            id: "l2",
            title: "Bài 2: Tính chất của ánh sáng: Hướng - Cường độ - Màu sắc - Độ gắt/mềm",
            duration: "24:10",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            hasAttachment: false
          },
          {
            id: "l3",
            title: "Bài 3: Tỉ lệ tương phản (Lighting Ratio 1:2, 1:4, 1:8) và ứng dụng thực tế",
            duration: "28:45",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            hasAttachment: true,
            attachmentName: "Bang_Ti_Le_Tuong_Phan_CheatSheet.pdf"
          }
        ]
      },
      {
        id: "m2",
        title: "Chương 2: Setup Đèn Studio Chuyên Nghiệp (1 Đèn đến 4 Đèn)",
        lessons: [
          {
            id: "l4",
            title: "Bài 4: Sức mạnh của 1 nguồn sáng duy nhất & Kỹ thuật hắt sáng Bouncing",
            duration: "32:15",
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            hasAttachment: false
          },
          {
            id: "l5",
            title: "Bài 5: Setup Rembrandt Lighting & Split Lighting tạo chiều sâu ma mị",
            duration: "36:40",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            hasAttachment: true,
            attachmentName: "Diagram_Studio_Lighting_Setup.pdf"
          },
          {
            id: "l6",
            title: "Bài 6: Kết hợp Key Light, Fill Light, Rim Light và Background Light",
            duration: "41:20",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            hasAttachment: false
          }
        ]
      },
      {
        id: "m3",
        title: "Chương 3: Thực Chiến Hậu Kỳ & Tặng Bộ Presets Độc Quyền",
        lessons: [
          {
            id: "l7",
            title: "Bài 7: Camera Raw / Lightroom Workflow: Giữ chi tiết Highlight & Shadow",
            duration: "30:10",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            hasAttachment: true,
            attachmentName: "MinhVu_Cinematic_Presets_Pack.zip"
          },
          {
            id: "l8",
            title: "Bài 8: Retouch da Beauty chuẩn bìa tạp chí trong Photoshop",
            duration: "45:00",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            hasAttachment: true,
            attachmentName: "Photoshop_Actions_DodgeBurn_Frequency.atn"
          }
        ]
      }
    ]
  },
  {
    id: "course-color-retouch",
    title: "Khoá Học: Phù Thuỷ Màu Sắc - Retouch Da & Tone Film Chuẩn Editorial",
    subtitle: "Nâng tầm bức ảnh thông thường thành tác phẩm nghệ thuật với màu sắc cảm xúc",
    category: "post-processing",
    badge: "Trending 2026",
    level: "Mọi cấp độ",
    studentsCount: 3910,
    rating: 4.93,
    reviewsCount: 512,
    originalPrice: 2800000,
    salePrice: 1450000,
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=85",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "15 giờ học • 20 bài giảng",
    instructor: "Nhiếp ảnh gia Y Võ",
    description: "Màu sắc chính là công cụ truyền tải cảm xúc mạnh mẽ nhất trong một khung hình. Khóa học hướng dẫn bạn làm chủ bánh xe màu sắc (Color Wheel), nguyên lý phối màu bổ túc - tương đồng, cách bóc tách và tái tạo màu da Á Đông trong trẻo, cùng bí quyết giả lập chất màu film Kodak Portra 400, Fuji 400H và Cinestill 800T.",
    whatYouWillLearn: [
      "Nguyên lý hòa sắc: Analogous, Complementary, Triadic và Split-Complementary",
      "Làm chủ công cụ Color Calibration & Tone Curve trong Lightroom",
      "Xử lý màu da (Skin Tone) hồng hào tự nhiên, loại bỏ ám xanh/vàng",
      "Quy trình giả lập hạt Grain film hữu cơ và Halation huyền ảo",
      "Tự tạo bộ LUTs và Presets mang phong cách cá nhân riêng biệt",
      "Tặng 30 file RAW chất lượng cao và bộ Color Look-Up Tables (LUTs)"
    ],
    prerequisites: "Đã cài đặt phần mềm Adobe Lightroom Classic hoặc Adobe Photoshop.",
    modules: [
      {
        id: "m1",
        title: "Chương 1: Khoa Học Màu Sắc & Cảm Xúc Thị Giác",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Tâm lý học màu sắc trong nhiếp ảnh nghệ thuật",
            duration: "18:30",
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            hasAttachment: true,
            attachmentName: "Ebook_Color_Theory.pdf"
          },
          {
            id: "l2",
            title: "Bài 2: Giải phẫu bảng màu Tone Curve & Color Grading",
            duration: "26:15",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            hasAttachment: false
          }
        ]
      },
      {
        id: "m2",
        title: "Chương 2: Công Thức Tone Film Huyền Thoại",
        lessons: [
          {
            id: "l3",
            title: "Bài 3: Tái tạo tone Kodak Portra 400 cho ảnh cưới & chân dung",
            duration: "35:40",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            hasAttachment: true,
            attachmentName: "Portra_400_Master_Preset.xmp"
          },
          {
            id: "l4",
            title: "Bài 4: Tone Hong Kong Mood ban đêm với ánh sáng Neon",
            duration: "31:20",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            hasAttachment: true,
            attachmentName: "Neon_HongKong_LUT.cube"
          }
        ]
      }
    ]
  },
  {
    id: "course-wedding-pro",
    title: "Khoá Học: Nhiếp Ảnh Cưới & Phóng Sự Cảm Xúc (Wedding Documentary Pro)",
    subtitle: "Bí quyết vận hành studio, bắt trọn khoảnh khắc vàng và kiếm 100tr+/tháng từ nghề cưới",
    category: "wedding",
    badge: "Thực chiến làm nghề",
    level: "Nâng cao & Làm nghề",
    studentsCount: 2150,
    rating: 4.98,
    reviewsCount: 420,
    originalPrice: 5200000,
    salePrice: 2790000,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "22 giờ học • 28 bài giảng thực chiến",
    instructor: "Nhiếp ảnh gia Y Võ",
    description: "Bộ giáo trình toàn diện nhất dành cho các nhiếp ảnh gia muốn bước chân vào thị trường phóng sự cưới cao cấp. Từ kỹ năng dự đoán khoảnh khắc (Anticipation), setup 2 body máy ảnh, phân chia góc máy với team, đến nghệ thuật kể chuyện (Storytelling) và chiến lược định giá, bán gói chụp High-End.",
    whatYouWillLearn: [
      "Quy trình chụp phóng sự cưới trọn vẹn: Nhà trai, nhà gái, lễ gia tiên, rước dâu và tiệc tối",
      "Kỹ thuật bắt trọn giọt nước mắt, nụ cười và những cái ôm mà không gây chú ý",
      "Kỹ thuật đồng bộ 2 máy ảnh và quản lý thẻ nhớ an toàn 100%",
      "Kỹ năng xử lý tình huống phát sinh: Ánh sáng gắt trưa, rạp cưới đèn LED đỏ/xanh",
      "Hợp đồng dịch vụ chuẩn pháp lý & Kịch bản tư vấn chốt hợp đồng giá cao",
      "Tặng mẫu Hợp đồng & Bảng báo giá chuyên nghiệp bằng file Word/Excel"
    ],
    prerequisites: "Sở hữu máy ảnh DSLR/Mirrorless và ống kính tiêu cự đa dụng hoặc cặp ống 35mm + 85mm.",
    modules: [
      {
        id: "m1",
        title: "Chương 1: Tư Duy Phóng Sự Cưới Đương Đại",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Phóng sự cưới (Journalism) khác gì chụp truyền thống?",
            duration: "21:00",
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            hasAttachment: true,
            attachmentName: "Tai_Lieu_Wedding_Storytelling.pdf"
          },
          {
            id: "l2",
            title: "Bài 2: Chuẩn bị thiết bị và checklist thiết yếu trước ngày cưới",
            duration: "28:15",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            hasAttachment: true,
            attachmentName: "Wedding_Day_Checklist.pdf"
          }
        ]
      }
    ]
  },
  {
    id: "course-fundamentals",
    title: "Nhập Môn Nhiếp Ảnh: Làm Chủ Máy Ảnh & Bố Cục Thị Giác Trong 7 Ngày",
    subtitle: "Dành cho người mới bắt đầu: Nắm vững tam giác phơi sáng và tư duy thẩm mỹ vững chắc",
    category: "basics",
    badge: "Khởi đầu hoàn hảo",
    level: "Người mới bắt đầu",
    studentsCount: 6420,
    rating: 4.91,
    reviewsCount: 890,
    originalPrice: 1500000,
    salePrice: 690000,
    thumbnail: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=85",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "8 giờ học • 14 bài giảng cốt lõi",
    instructor: "Nhiếp ảnh gia Y Võ",
    description: "Bạn vừa mua chiếc máy ảnh đầu tiên và cảm thấy choáng ngợp trước hàng trăm nút bấm và menu phức tạp? Khóa học sẽ giúp bạn chuyển hoàn toàn từ chế độ Auto sang chế độ Manual tự tin chỉ sau 7 ngày, giải thích mọi khái niệm bằng hình ảnh sinh động, dễ hiểu nhất.",
    whatYouWillLearn: [
      "Giải mã Tam giác phơi sáng: Khẩu độ (Aperture), Tốc độ màn trập (Shutter Speed), Độ nhạy sáng (ISO)",
      "Hiểu rõ về tiêu cự ống kính: Wide, Standard, Telephoto và độ sâu trường ảnh DOF",
      "Lấy nét chuẩn xác: Single AF, Continuous AF, Eye-AF và lấy nét tay",
      "Cách đọc biểu đồ Histogram để không bao giờ bị cháy sáng hay tối đen",
      "10 quy tắc bố cục vàng giúp ảnh chụp ra có hồn ngay lập tức",
      "Thực hành 7 bài tập chụp ảnh thực tế tại nhà và ngoài trời"
    ],
    prerequisites: "Bất kỳ máy ảnh DSLR, Mirrorless hoặc smartphone có chế độ chụp Chuyên nghiệp (Pro).",
    modules: [
      {
        id: "m1",
        title: "Chương 1: Tam Giác Phơi Sáng & Chế Độ Thủ Công",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Làm quen máy ảnh & Tại sao không nên chụp Auto?",
            duration: "16:45",
            isPreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            hasAttachment: true,
            attachmentName: "So_Do_Tam_Giac_Phoi_Sang.pdf"
          },
          {
            id: "l2",
            title: "Bài 2: Khẩu độ & Ảo thuật xóa phông Bokeh",
            duration: "22:30",
            isPreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            hasAttachment: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-89240",
    customerName: "Đỗ Hoàng Long",
    phoneNumber: "0912345678",
    courseId: "course-lighting-mastery",
    courseTitle: "Masterclass: Nghệ Thuật Ánh Sáng & Bố Cục Chân Dung Đỉnh Cao",
    amount: 1890000,
    paymentMethod: "VietQR (Techcombank)",
    status: "PAID",
    createdAt: "2026-09-24T14:32:00Z",
    invoiceNumber: "INV-2026-09240"
  },
  {
    id: "ORD-89239",
    customerName: "Nguyễn Hải Anh",
    phoneNumber: "0987654321",
    courseId: "course-color-retouch",
    courseTitle: "Khoá Học: Phù Thuỷ Màu Sắc - Retouch Da & Tone Film Chuẩn Editorial",
    amount: 1450000,
    paymentMethod: "Ví MoMo",
    status: "PAID",
    createdAt: "2026-09-25T09:15:00Z",
    invoiceNumber: "INV-2026-09239"
  },
  {
    id: "ORD-89238",
    customerName: "Trần Minh Quân",
    phoneNumber: "0903112233",
    courseId: "course-wedding-pro",
    courseTitle: "Khoá Học: Nhiếp Ảnh Cưới & Phóng Sự Cảm Xúc (Wedding Documentary Pro)",
    amount: 2790000,
    paymentMethod: "VietQR (Techcombank)",
    status: "PENDING",
    createdAt: "2026-09-27T10:45:00Z",
    invoiceNumber: "INV-2026-09238"
  },
  {
    id: "ORD-89237",
    customerName: "Lê Thị Thảo",
    phoneNumber: "0934567890",
    courseId: "course-fundamentals",
    courseTitle: "Nhập Môn Nhiếp Ảnh: Làm Chủ Máy Ảnh & Bố Cục Thị Giác Trong 7 Ngày",
    amount: 690000,
    paymentMethod: "VNPAY-QR",
    status: "PAID",
    createdAt: "2026-09-26T16:20:00Z",
    invoiceNumber: "INV-2026-09237"
  }
];

export const INITIAL_USERS = [
  {
    id: "user-admin",
    phoneNumber: "0988888888",
    fullName: "Y Võ Visual (Admin)",
    role: "admin",
    joinedDate: "2024-01-01",
    enrolledCourses: ["course-lighting-mastery", "course-color-retouch", "course-wedding-pro", "course-fundamentals"],
    totalSpent: 0
  },
  {
    id: "user-student-1",
    phoneNumber: "0912345678",
    fullName: "Đỗ Hoàng Long",
    role: "student",
    joinedDate: "2026-08-15",
    enrolledCourses: ["course-lighting-mastery"],
    totalSpent: 1890000
  },
  {
    id: "user-student-2",
    phoneNumber: "0987654321",
    fullName: "Nguyễn Hải Anh",
    role: "student",
    joinedDate: "2026-09-10",
    enrolledCourses: ["course-color-retouch"],
    totalSpent: 1450000
  }
];
