import type { Project } from '@/types/project'

/**
 * All portfolio projects, in display order.
 *
 * Content rules:
 * - Never invent metrics, user counts, KPIs or confidential details: use `TODO:` placeholders.
 * - Leave a case study section out entirely when nothing is known about it.
 * - Work projects must not reveal client names, internal hosts, API paths or source locations.
 *
 * This module is imported by build-time code in Node, so it must not use `import.meta.env`
 * or import assets. Images live in `public/` and are referenced by relative path.
 */
export const projects: readonly Project[] = [
  {
    slug: 'large-file-upload-system',
    cover: { src: 'images/projects/large-file-upload-system.svg', width: 1600, height: 900 },
    technologies: ['Vue', 'AWS S3', 'WebGL', 'Resumable.js'],
    featured: true,
    content: {
      'zh-TW': {
        title: '檔案管理系統：大檔上傳與 CAD 檢視',
        subtitle: '單檔 5 GB、單次 100 檔的背景批次上傳，以及列表 hover 即可預覽的 CAD 檢視',
        summary:
          '檔案管理系統的上傳與 CAD 檢視：以分級分片、雙層併發排程與重試續傳支援單檔 5 GB 直傳 S3；CAD 檢視以單例 WebGL 與縮圖快取，讓列表 hover 預覽不再耗盡資源。',
        coverAlt: '檔案管理系統的介面示意圖（placeholder）',
        highlights: [
          '單檔 5 GB・單次 100 檔',
          '依檔案大小分級分片（10／16／32 MB）',
          '全域 3、單檔 1 的併發排程',
          '重試、續傳與對帳',
          'S3 直傳（單次／分段）',
          '跨頁背景上傳',
          'CAD hover 縮圖與全螢幕檢視',
          '成員存取權限管理',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的「檔案管理系統 v2」，讓使用者上傳與管理圖片、影片、CAD 等檔案。管理員建立資料夾結構並設定權限，使用者依權限上傳、預覽、下載與分享文件，系統也提供版本紀錄、垃圾桶與活動紀錄。',
            '上傳一開始只是單純的檔案上傳，之後隨需求一步步演進：CAD 檔案可能非常大，需要支援大檔上傳；大檔上傳太慢，於是做了檔案切割；接著又有續傳的需求；最後為了不讓檔案佔用後端空間，改成直接上傳至 AWS。',
            '這個 Case Study 聚焦在兩個機制：大檔批次上傳，以及 CAD 圖檔檢視。',
          ],
          role: {
            title: '前端工程師 · 億集創見應用科技（2025/06 起）',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '大檔批次上傳：分片、併發排程、重試續傳、S3 直傳與跨頁進度',
              'CAD 圖檔檢視：列表 hover 縮圖與全螢幕檢視',
            ],
          },
          problem: [
            '需求的硬條件決定了設計：單檔最大 5 GB、單次最多 100 檔、檔案以動輒數百 MB 的 CAD／BIM 圖檔為主、網路不穩定，而且使用者不該被綁在上傳畫面上。',
            '檔案原本先經過後端空間再上傳至 AWS，大檔案讓後端空間撐不住。',
            'CAD 預覽使用的套件是全域單例，destroy() 也不會真正釋放 WebGL context。每次預覽都重建 viewer 的直覺做法，在列表上 hover 十幾次後就會碰到瀏覽器的 WebGL context 上限而無法顯示。',
          ],
          architecture: {
            steps: [
              '畫面層只做前置檢查（檔數上限、剩餘容量），把上傳交給 store',
              'store 以「批次（session）／檔案（task）」兩層模型與狀態機，集中管理排程、重試續傳與進度',
              '建立批次時由後端依環境與檔案大小決定策略：S3 單次直傳、S3 分段直傳，或退回後端分片上傳',
              '分片依檔案大小分級，由排程器在全域與單檔兩個併發上限內送出',
              '上傳完成後輪詢處理狀態，並以輕量的訊號通知列表頁自動刷新',
              'CAD 檢視只有一個常駐容器與單例 viewer，在列表縮圖與全螢幕燈箱之間搬移，不重建 WebGL',
            ],
          },
          solution: [
            '上傳以兩層模型與狀態機管理，所有排程集中在 store，API 層只是薄封裝。是否直傳 S3 由後端依部署環境決定，不符合條件的檔案自動退回後端分片，讓「走不走 S3」成為部署決策，而不是寫死在前端。',
            '大檔以分級分片平衡請求數與單片重試成本；失敗只對網路錯誤與 5xx 以指數退避重試，4xx 直接失敗；續傳前先向 S3 或後端對帳已完成的分片，避免重傳已成功的部分。',
            '上傳在背景跨頁進行。列表頁只監聽一個輕量的刷新訊號，上傳相關程式以動態 import 載入，不會進入首屏 bundle。既有的「更新版本」流程則保留以 Resumable.js 上傳。',
            'CAD 檢視不再每次重建：單一容器在掛載點之間搬移（搬移 DOM 會保留 WebGL context），開檔以佇列序列化，並用遞增序號作廢已過時的請求。',
          ],
          challenges: [
            {
              challenge: '5 GB 的檔案若分片太小會產生數百個請求，太大則單片失敗的重傳成本高',
              solution:
                '依檔案大小分級：小於 100 MB 用 10 MB、100 MB 到 1 GB 用 16 MB、超過 1 GB 用 32 MB。分片大小只看檔案大小、不看網速，讓總片數保持可預測，與後端對帳時不會出錯。',
            },
            {
              challenge: '多檔同時上傳時，只取佇列隊頭會讓同一個檔案的下一片卡住其他檔案',
              solution:
                '手寫排程器：全域同時最多 3 片、單一檔案 1 片（循序送出，後端合併時不必處理亂序），並往後尋找第一個所屬檔案仍有額度的分片，避免隊頭阻塞。',
            },
            {
              challenge: '大檔直傳 S3 可能需要上千個分段簽章，一次全部取得會有過期風險',
              solution:
                '每次向後端索取 20 個分段的簽章，同一檔案同時上傳 3 個分段；分段失敗重試前先把已回報的進度扣回，避免重複計算讓進度條超過 100%。',
            },
            {
              challenge: '上傳進度事件每秒觸發數十次，大批次上傳時整個進度面板重繪卡頓',
              solution:
                '以 200 ms 的 leading＋trailing 節流更新進度，完成時強制立即更新；同時降低了把狀態寫入 localStorage 的頻率。',
            },
            {
              challenge: '在列表上反覆 hover 預覽 CAD，十幾次後 WebGL context 失效',
              solution:
                '改為單例 viewer 加上常駐容器，容器在掛載點之間搬移而不重建。縮圖模式略過字型載入以加速，並把第一次的渲染結果截圖存入 60 筆的 LRU 快取；判定為空白的截圖不存入，避免之後一直顯示空白。',
            },
          ],
          results: [
            '支援單檔最大 5 GB、單次最多 100 檔的背景批次上傳，可跨頁進行，完成後自動刷新列表',
            '失敗或中斷後可續傳，只重傳未完成的分片；部分成功的批次會標示完成與未完成的數量，而不是整批顯示失敗',
            '檔案直接上傳至 S3，不再佔用後端空間；不支援直傳的環境自動退回後端分片上傳',
            'CAD 圖檔可在列表 hover 預覽，第二次 hover 由快取立即顯示，也不再因反覆預覽耗盡 WebGL context',
            'TODO: 如有確認過的數據（例如上傳時間）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'File Management: Large Uploads & CAD Viewer',
        subtitle:
          'Background batch uploads of up to 100 files and 5 GB per file, plus CAD previews on hover',
        summary:
          'Uploads and CAD viewing for a file-management system: tiered chunking, a two-level concurrency scheduler and resumable retries support 5 GB files uploaded straight to S3; a singleton WebGL viewer with a thumbnail cache keeps hover previews from exhausting resources.',
        coverAlt: 'Illustration of the file management system interface (placeholder)',
        highlights: [
          '5 GB per file, 100 files per batch',
          'Chunk size tiered by file size (10 / 16 / 32 MB)',
          'Concurrency: 3 overall, 1 per file',
          'Retries, resuming and reconciliation',
          'Direct upload to S3 (single / multipart)',
          'Background uploads across pages',
          'CAD thumbnails on hover and full-screen viewer',
          'Member access permissions',
        ],
        caseStudy: {
          overview: [
            'File Management System v2 at 億集創見應用科技 lets users upload and manage images, videos and CAD files. Administrators set up folders and permissions; users upload, preview, download and share documents according to their permissions, with version history, a recycle bin and an activity log.',
            'Uploading started as a simple file upload and evolved step by step: CAD files can be very large, so large uploads had to be supported; large uploads were too slow, so files were split into chunks; resuming interrupted uploads came next; finally, to keep files off the backend storage, uploads were changed to go directly to AWS.',
            'This case study focuses on two mechanisms: large batch uploads and the CAD viewer.',
          ],
          role: {
            title: 'Frontend Engineer · 億集創見應用科技 (since 2025/06)',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Large batch uploads: chunking, concurrency scheduling, retries and resuming, direct S3 uploads and progress across pages',
              'CAD viewer: thumbnails on hover in the file list and a full-screen viewer',
            ],
          },
          problem: [
            'Hard requirements drove the design: up to 5 GB per file, up to 100 files per batch, mostly CAD/BIM drawings of several hundred MB, unreliable networks, and users should not be tied to the upload screen.',
            'Files first went through backend storage before being uploaded to AWS, and large files overwhelmed that storage.',
            'The CAD viewer library is a global singleton, and its destroy() does not actually release the WebGL context. Rebuilding the viewer for every preview hit the browser’s WebGL context limit after a dozen or so hovers in the file list.',
          ],
          architecture: {
            steps: [
              'The page only runs pre-checks (file count limit, remaining quota) and hands the upload to a store',
              'The store manages scheduling, retries and progress with a two-level model (session / task) and a state machine',
              'When a batch is created, the backend picks the strategy by environment and file size: single S3 upload, S3 multipart upload, or a fallback to chunked uploads through the backend',
              'Chunks are sized by file size and sent by a scheduler within an overall limit and a per-file limit',
              'After uploading, the store polls for processing status and signals the file list to refresh',
              'The CAD viewer uses one persistent container and a singleton viewer, moved between list thumbnails and the full-screen lightbox without rebuilding WebGL',
            ],
          },
          solution: [
            'Uploads are managed by a two-level model and a state machine; all scheduling lives in the store and the API layer stays thin. Whether to upload directly to S3 is decided by the backend per deployment, and files that do not qualify fall back to backend chunking, so using S3 is a deployment decision rather than something hard-coded in the frontend.',
            'Tiered chunk sizes balance the number of requests against the cost of retrying a chunk. Only network errors and 5xx responses are retried, with exponential backoff; 4xx responses fail immediately. Before resuming, the client reconciles completed chunks with S3 or the backend so it never re-sends what already succeeded.',
            'Uploads run in the background across pages. The file list only watches a lightweight refresh signal, and the upload runtime is loaded with a dynamic import so it stays out of the initial bundle. The existing “upload new version” flow still uses Resumable.js.',
            'The CAD viewer is no longer rebuilt: a single container moves between mount points (moving a DOM node keeps its WebGL context), file opens are serialized in a queue, and an incrementing token discards requests that have been superseded.',
          ],
          challenges: [
            {
              challenge:
                'For 5 GB files, small chunks mean hundreds of requests while large chunks make each retry expensive',
              solution:
                'Chunk size is tiered by file size: 10 MB under 100 MB, 16 MB up to 1 GB and 32 MB above that. It depends only on file size, not network speed, so the chunk count stays predictable when reconciling with the backend.',
            },
            {
              challenge:
                'With several files uploading, always taking the head of the queue let one file’s next chunk block every other file',
              solution:
                'A hand-written scheduler allows 3 chunks overall and 1 per file (sequential per file, so the backend never has to merge out of order), and picks the first queued chunk whose file still has capacity, avoiding head-of-line blocking.',
            },
            {
              challenge:
                'Direct S3 uploads of large files can need thousands of part signatures, which may expire if requested all at once',
              solution:
                'Request signatures 20 parts at a time and upload 3 parts of a file concurrently. Before retrying a failed part, subtract its reported progress so the progress bar never double-counts past 100%.',
            },
            {
              challenge:
                'Upload progress events fire dozens of times per second, and large batches made the whole progress panel stutter',
              solution:
                'Throttle progress updates to 200 ms (leading and trailing), with an immediate update on completion; this also cut how often state is written to localStorage.',
            },
            {
              challenge:
                'Repeatedly hovering CAD files in the list lost the WebGL context after a dozen or so previews',
              solution:
                'Switched to a singleton viewer with a persistent container that moves between mount points instead of being rebuilt. Thumbnail mode skips font loading for speed, and the first render is captured into a 60-entry LRU cache; blank captures are never cached, so a blank thumbnail cannot stick.',
            },
          ],
          results: [
            'Background batch uploads of up to 100 files and 5 GB per file, continuing across pages and refreshing the file list when done',
            'Failed or interrupted uploads resume and only re-send unfinished chunks; partially successful batches report how many files finished instead of failing the whole batch',
            'Files go straight to S3 and no longer take up backend storage; environments without direct upload fall back to backend chunking',
            'CAD drawings preview on hover, a second hover is served instantly from the cache, and repeated previews no longer exhaust WebGL contexts',
            'TODO: Add verified figures if available (e.g. upload times)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'multi-stream-video-system',
    cover: { src: 'images/projects/multi-stream-video-system.svg', width: 1600, height: 900 },
    technologies: ['Vue', 'WebRTC', 'WebSocket', 'MSE'],
    featured: true,
    content: {
      'zh-TW': {
        title: '監控系統：即時串流與多路回放',
        subtitle: '以 WebRTC 同時監看 12 支攝影機，以自建的 MSE 播放引擎同步回放 4 路歷史影像',
        summary:
          '監控系統的前端：以 WebSocket 信令建立 WebRTC 連線顯示 12 路即時影像；歷史回放以 MSE 自建播放引擎，處理錄影空檔、倍速緩衝與 4 路同步播放。',
        coverAlt: '監控系統的畫面示意圖（placeholder）',
        highlights: [
          '12 路 WebRTC 即時監看',
          'WebSocket 信令與自動重連',
          '移動偵測警報與提示音',
          'MSE 歷史回放・4 個播放器',
          '錄影空檔自動跳過',
          '多路同步播放',
          '可拖曳縮放的時間軸',
          '0.25–4 倍速播放',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的 NVR 監控系統，前端分為四個功能頁：即時監看（固定 12 格）、個別監控（只顯示偵測到異動的攝影機並播放提示音）、歷史回放（4 個播放器與同步控制），以及相機設置（含移動偵測的感興趣區域 ROI）。',
            '即時監控一開始只有一支攝影機，之後需求改為 12 支；歷史回放則需要同時播放 4 支影片，並支援時間軸拖放。',
          ],
          role: {
            title: '前端工程師 · 億集創見應用科技（2025/06 起）',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '將後端同事設計的 WebRTC 架構改寫為 Vue 版本，並優化程式碼',
              '將即時監控擴充到 12 路，並處理逾時重試與斷線重連',
              '歷史回放：MSE 播放引擎、互動時間軸、倍速與多路同步播放',
            ],
          },
          problem: [
            '即時監控從 1 支擴充到 12 支，每一路都要各自完成信令、建立連線，並在逾時或斷線時自行恢復。',
            '歷史回放是問題最多的部分：同時播放 4 支影片常常卡頓、報錯；錄影中間有空檔時會卡住或跳過；原本要支援 8 倍速，但本地瀏覽器負荷不了。',
            '多支攝影機的歷史影像要能對齊同一個時間點一起播放。',
          ],
          architecture: {
            steps: [
              '前端取得攝影機清單後，透過 WebSocket 為每一路送出初始化訊息；前端只送攝影機 id，由後端自行拉取 RTSP 串流',
              '後端回傳 offer，前端建立 RTCPeerConnection、回傳 answer 並交換 ICE candidate；影像經 WebRTC 直接傳送，不經過 WebSocket',
              'WebSocket 持續推送移動偵測、警報與攝影機連線狀態，驅動指示燈與個別監控的顯示',
              '歷史回放的播放器向後端取得時間軸與播放清單，下載影片片段後寫入 MSE 的 SourceBuffer 播放',
              '自建的互動時間軸負責拖曳、縮放與播放頭；多路同步由頁面統一計算並下發目標時間',
            ],
          },
          solution: [
            '即時串流：每一路等待 offer 逾時 15 秒就自動重試，最多 3 次；WebSocket 斷線時以指數退避重連（2 秒起、上限 20 秒），重連後所有路重新初始化；元件卸載時關閉所有連線與計時器，避免資源殘留。',
            '歷史回放：自建 MSE 播放引擎。每個片段依「實際起始時間 − 清單基準時間」放到 video 的時間軸上，並以 LRU 快取這些偏移量；錄影空檔因此保留為緩衝區之間的空隙，video.currentTime 永遠能換算回真實時間。',
            '緩衝策略依播放速度調整：倍速越高，保留的回溯緩衝越少、每次補充的片段越多；緩衝快播完時自動續載下一段播放清單。',
          ],
          challenges: [
            {
              challenge: '4 個播放器同時回放時常常卡頓、報錯',
              solution:
                '反覆調整緩衝與快取：寫入 SourceBuffer 一律經過單一佇列以確保順序；依播放速度調整回溯緩衝與補片數量；碰到瀏覽器緩衝配額上限時強制修剪後重試；中止下載超過 30 秒或屬於舊播放清單的片段。',
            },
            {
              challenge: '錄影中間有空檔時，播放會卡住或跳過',
              solution:
                '以真實時間計算每個片段的位置，把空檔保留為緩衝區之間的空隙；播到空檔時用 requestAnimationFrame 推進「虛擬時間」並通知介面，到下一段緩衝時再跳過去。',
            },
            {
              challenge: '需求要求 8 倍速播放，但本地瀏覽器負荷不了',
              solution: '將倍速上限調整為 4 倍（0.25–4 倍），並讓緩衝策略隨播放速度調整。',
            },
            {
              challenge: '多路回放要對齊同一個時間點一起播放',
              solution:
                '先計算所有攝影機的共同時間區間，再以同一個基準時間下發給各播放器；等全部就緒並確認彼此誤差在 400 ms 內，最後在同一個 animation frame 內同時開始播放。',
            },
            {
              challenge: '拖曳時間軸時若即時重新載入，會產生大量請求',
              solution:
                '播放頭固定在中央，拖曳的是時間軸本身；只有放開滑鼠且移動超過 5 秒時，才重新載入播放清單。',
            },
          ],
          results: [
            '即時監看同時顯示 12 路影像，逾時自動重試、斷線自動重連',
            '個別監控只顯示偵測到異動的攝影機，並在警報出現時播放提示音',
            '歷史回放支援 4 個播放器、多路同步播放、可拖曳縮放的時間軸與 0.25–4 倍速',
            '錄影空檔可以正確跳過，播放時間永遠能對應回真實時間',
            'TODO: 如有確認過的數據（例如延遲、卡頓改善）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Surveillance System: Live Streams & Multi-camera Playback',
        subtitle:
          'Live monitoring of 12 cameras over WebRTC and synchronized playback of 4 recordings with a custom MSE player',
        summary:
          'Frontend of a surveillance system: WebRTC connections negotiated over WebSocket show 12 live feeds, and a custom MSE playback engine handles recording gaps, speed-dependent buffering and synchronized playback of 4 cameras.',
        coverAlt: 'Illustration of the surveillance system (placeholder)',
        highlights: [
          '12 live feeds over WebRTC',
          'WebSocket signaling with auto-reconnect',
          'Motion alerts with sound',
          'MSE playback with 4 players',
          'Recording gaps skipped automatically',
          'Synchronized multi-camera playback',
          'Draggable, zoomable timeline',
          '0.25–4x playback speed',
        ],
        caseStudy: {
          overview: [
            'The NVR surveillance system at 億集創見應用科技 has four frontend pages: live view (a fixed 12-cell grid), alert monitoring (only cameras that detect motion, with an alert sound), history playback (4 players with synchronized control) and camera settings (including regions of interest for motion detection).',
            'Live monitoring started with a single camera and the requirement grew to 12; history playback has to play 4 recordings at once and support scrubbing along a timeline.',
          ],
          role: {
            title: 'Frontend Engineer · 億集創見應用科技 (since 2025/06)',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Rewrote the WebRTC architecture designed by a backend colleague as a Vue implementation and optimized the code',
              'Scaled live monitoring to 12 feeds, with timeout retries and reconnection',
              'History playback: the MSE playback engine, interactive timeline, playback speeds and synchronized playback',
            ],
          },
          problem: [
            'Live monitoring grew from 1 camera to 12, and every feed has to complete signaling, connect and recover on its own after timeouts or disconnects.',
            'History playback caused the most problems: playing 4 recordings at once often stuttered or threw errors, gaps in the recordings made playback get stuck or skip, and the original requirement of 8x speed was more than the local browser could handle.',
            'Recordings from several cameras have to line up and play from the same point in time.',
          ],
          architecture: {
            steps: [
              'After loading the camera list, the frontend sends an init message per camera over WebSocket; it only sends a camera id and the backend pulls the RTSP stream itself',
              'The backend replies with an offer; the frontend creates an RTCPeerConnection, answers and exchanges ICE candidates. Video flows over WebRTC, not through the WebSocket',
              'The WebSocket keeps pushing motion, alert and camera connection events, which drive the status indicators and the alert monitoring page',
              'Each playback player fetches the timeline and playlist from the backend, downloads video segments and appends them to an MSE SourceBuffer',
              'A custom interactive timeline handles dragging, zooming and the playhead; the page computes and distributes a common target time for synchronized playback',
            ],
          },
          solution: [
            'Live streams: each feed retries automatically after waiting 15 seconds for an offer, up to 3 times; a dropped WebSocket reconnects with exponential backoff (from 2 s, capped at 20 s) and re-initializes every feed; unmounting closes every connection and timer so nothing leaks.',
            'History playback uses a custom MSE engine. Each segment is placed on the video timeline at “segment start time − playlist reference time”, with the offsets kept in an LRU cache. Recording gaps therefore stay as gaps between buffered ranges, and video.currentTime can always be mapped back to real time.',
            'Buffering adapts to playback speed: faster playback keeps less back buffer and fetches more segments per refill, and the next part of the playlist is loaded automatically before the buffer runs out.',
          ],
          challenges: [
            {
              challenge: 'Playing 4 recordings at once often stuttered or threw errors',
              solution:
                'Iterated on buffering and caching: every SourceBuffer append goes through a single queue to keep order; back buffer and refill size follow playback speed; hitting the browser’s buffer quota forces a trim and a retry; segment downloads older than 30 seconds or from a superseded playlist are aborted.',
            },
            {
              challenge: 'Gaps in the recordings made playback get stuck or skip',
              solution:
                'Segments are positioned by real time, so a gap stays as a gap between buffered ranges. While playing through a gap, requestAnimationFrame advances a “virtual time” and notifies the UI, then playback jumps to the next buffered range.',
            },
            {
              challenge:
                'The requirement asked for 8x playback, but the local browser could not keep up',
              solution:
                'Capped playback speed at 4x (0.25–4x) and made the buffering strategy follow the playback speed.',
            },
            {
              challenge: 'Playback from several cameras must line up and start at the same moment',
              solution:
                'Compute the time range shared by all cameras, send every player the same reference time, wait until all are ready and within 400 ms of each other, then start them all in the same animation frame.',
            },
            {
              challenge:
                'Reloading on every movement while dragging the timeline would flood the backend',
              solution:
                'The playhead stays fixed in the center and the timeline itself moves; the playlist only reloads when the mouse is released after moving more than 5 seconds.',
            },
          ],
          results: [
            'Live view shows 12 feeds at once, with automatic retries and reconnection',
            'Alert monitoring shows only cameras that detect motion and plays a sound when an alert appears',
            'History playback supports 4 players, synchronized playback, a draggable and zoomable timeline, and 0.25–4x speed',
            'Recording gaps are skipped correctly, and playback time always maps back to real time',
            'TODO: Add verified figures if available (e.g. latency, reduced stuttering)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'b2b-corporate-website',
    cover: { src: 'images/projects/b2b-corporate-website.svg', width: 1600, height: 900 },
    technologies: ['Laravel', 'Vue', 'GitHub Actions', 'Linode', 'GA4', 'Cloudflare'],
    featured: true,
    content: {
      'zh-TW': {
        title: 'B2B 企業官網',
        subtitle: '個人接案：Laravel 前台兼顧 SEO、Vue 後台管理產品與詢價',
        summary:
          '個人接案的 B2B 企業官網：前台以 Laravel 開發以兼顧 SEO，後台以 Vue + API 管理產品與規格，並透過 GitHub Actions 部署到 Linode。',
        coverAlt: 'B2B 企業官網的頁面示意圖（placeholder）',
        highlights: [
          'Product Management',
          'Product Specification',
          'Inquiry',
          'SEO',
          'GA4',
          'Email',
          'Cloudflare',
        ],
        caseStudy: {
          overview: [
            '個人接案開發的 B2B 企業官網，包含產品管理、產品規格展示、線上詢價與 Email 通知，並處理 SEO 與 GA4 追蹤。',
            'TODO: 補充客戶產業、網站目的與目標客群（避免透露客戶的機密資訊）。',
          ],
          role: {
            title: '接案開發者（個人承接）',
            responsibilities: [
              '以 Laravel 開發前台網站',
              '以 Vue + API 開發後台管理',
              '以 GitHub Actions 建立部署流程，部署到 Linode 主機',
            ],
          },
          problem: [
            '企業官網需要被搜尋引擎收錄，前台頁面必須對 SEO 友善；同時客戶需要一個後台來管理產品與規格。',
          ],
          architecture: {
            steps: [
              '後台以 Vue 開發，透過 API 管理產品與產品規格',
              '前台以 Laravel 開發，考量 SEO 由伺服器輸出頁面內容',
              '訪客可在前台瀏覽產品規格並送出詢價',
              '透過 GitHub Actions 部署到 Linode 主機',
              'TODO: 補充 Email 通知、GA4 與 Cloudflare 在架構中的位置',
            ],
          },
          solution: [
            '將前台與後台分開：前台考量 SEO 使用 Laravel，後台使用 Vue + API，並以 GitHub Actions 自動部署到 Linode。',
            'TODO: 補充 SEO、GA4 與 Email 通知的實作細節。',
          ],
          challenges: [
            {
              challenge: '企業官網的前台頁面需要對搜尋引擎友善',
              solution: '前台改用 Laravel 開發，由伺服器輸出頁面內容。',
            },
          ],
          results: [
            '網站透過 GitHub Actions 部署到 Linode',
            'TODO: 成果（請勿填入未經確認的流量或詢價數字）',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'B2B Corporate Website',
        subtitle:
          'Freelance project: SEO-friendly Laravel site with a Vue admin for products and inquiries',
        summary:
          'A freelance B2B corporate website: the public site is built with Laravel for SEO, the admin uses Vue with an API to manage products and specifications, and GitHub Actions deploys it to Linode.',
        coverAlt: 'Illustration of the B2B corporate website (placeholder)',
        highlights: [
          'Product Management',
          'Product Specification',
          'Inquiry',
          'SEO',
          'GA4',
          'Email',
          'Cloudflare',
        ],
        caseStudy: {
          overview: [
            'A B2B corporate website I built as a freelance project, with product management, product specifications, online inquiries and email notifications, plus SEO and GA4 tracking.',
            "TODO: Describe the client's industry, the site's purpose and its audience (without confidential details).",
          ],
          role: {
            title: 'Freelance developer',
            responsibilities: [
              'Built the public website with Laravel',
              'Built the admin with Vue and an API',
              'Set up deployment to a Linode server with GitHub Actions',
            ],
          },
          problem: [
            'A corporate website has to be indexed by search engines, so the public pages must be SEO-friendly; the client also needed an admin to manage products and specifications.',
          ],
          architecture: {
            steps: [
              'The admin, built with Vue, manages products and specifications through an API',
              'The public site, built with Laravel, renders pages on the server for SEO',
              'Visitors browse product specifications and send inquiries on the public site',
              'GitHub Actions deploys the site to a Linode server',
              'TODO: Describe where email notifications, GA4 and Cloudflare fit in',
            ],
          },
          solution: [
            'Separated the public site from the admin: Laravel for the public site because of SEO, Vue with an API for the admin, and automatic deployment to Linode with GitHub Actions.',
            'TODO: Describe how SEO, GA4 and email notifications were implemented.',
          ],
          challenges: [
            {
              challenge:
                'The public pages of a corporate website need to be search-engine friendly',
              solution: 'Built the public site with Laravel so pages are rendered on the server.',
            },
          ],
          results: [
            'The site is deployed to Linode through GitHub Actions',
            'TODO: Results (do not add unverified traffic or inquiry numbers)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
]

export const MAX_FEATURED_PROJECTS = 3

/** Lowercase letters and digits, separated by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const featuredProjects: readonly Project[] = projects
  .filter((project) => project.featured)
  .slice(0, MAX_FEATURED_PROJECTS)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Neighbours in display order; missing at either end. */
export function getAdjacentProjects(slug: string): { previous?: Project; next?: Project } {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return {}
  return { previous: projects[index - 1], next: projects[index + 1] }
}
