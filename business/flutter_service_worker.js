'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "abc1e78a22c136e5975cff991e745296",
"assets/AssetManifest.bin.json": "58510a418131f507b000f4b0f1383d95",
"assets/assets/config/settings.json": "9d239d2134f45f2e26b46d91877535bf",
"assets/assets/images/barcode_scan.png": "89d3ffd9106046f88e2d3cbfb4b6ff59",
"assets/assets/images/bar_chart.png": "9d6a4f1ca002217c93cb4f1535697059",
"assets/assets/images/buy_x_get_y_coupon_logo.png": "22c68059ab9eeedd8d7375cf9c1e2446",
"assets/assets/images/camera.png": "90ecbf033b34f9825f1351c525227226",
"assets/assets/images/camera32.png": "86ac8c1b70d67de0e1c89b6546a48b50",
"assets/assets/images/camera36.png": "c22769cbe0dbf59b77fb1686888c6dfe",
"assets/assets/images/cart_shopping.png": "7c6dcf3d5e928054fc807fd57fbc9657",
"assets/assets/images/CouponIconFromCreate/buyxgety_coupon.png": "75f8f59c8db2ad21725ea7fd35f8dddd",
"assets/assets/images/CouponIconFromCreate/buyxgety_coupon_1.png": "0b26a6aa50c105ce359bc1772e5d66f4",
"assets/assets/images/CouponIconFromCreate/buyxgety_coupon_2.png": "0c8774faadd08b210776c445d579430f",
"assets/assets/images/CouponIconFromCreate/expiring_coupon.png": "12958f08b0775561b09a90e9ea36b813",
"assets/assets/images/CouponIconFromCreate/fix_price_2.png": "488009cd52ab0dfda73329dfabbbaa2b",
"assets/assets/images/CouponIconFromCreate/fix_price_coupon.png": "488009cd52ab0dfda73329dfabbbaa2b",
"assets/assets/images/CouponIconFromCreate/fix_price_coupon_1.png": "e9eaaa72733c9d31ec4691591afcfdc2",
"assets/assets/images/CouponIconFromCreate/fix_price_coupon_2.png": "56b95e70252d24154672ef01ca43bcd6",
"assets/assets/images/CouponIconFromCreate/free_gift_coupon_1.png": "189877de7db063798ed74bdfe43a2a3a",
"assets/assets/images/CouponIconFromCreate/free_gift_coupon_2.png": "ac5c82a48900e1f4f697e61c021b8273",
"assets/assets/images/CouponIconFromCreate/instant_discount_coupon.png": "7eeee747a01cb2d03d14e632785ad76c",
"assets/assets/images/CouponIconFromCreate/instant_discount_coupon_1.png": "3b566390d08a9ac9fa63090e0446ce58",
"assets/assets/images/CouponIconFromCreate/instant_discount_coupon_2.png": "96855c497ad914ef9fa4455a6ef5244d",
"assets/assets/images/CouponIconFromCreate/percentage_discount_coupon.png": "7bd9fb15a25437bbcadd17486c7c757b",
"assets/assets/images/CouponIconFromCreate/percentage_discount_coupon_2.png": "305f38fff5c677481a787d179691701e",
"assets/assets/images/CouponIconFromCreate/percentage_off_coupon_1.png": "8b02f488676bbfcfb6dd3d6e43c31d23",
"assets/assets/images/CouponIconFromCreate/quantity_discount_1.png": "316130096cb2b7e436fcef0155bc9fd5",
"assets/assets/images/CouponIconFromCreate/quantity_discount_coupon.png": "fe638ff435a05c7937ea81973568dec9",
"assets/assets/images/CouponIconFromCreate/quantity_discount_coupon_2.png": "ed2fca50a46af86c64bd2b9e4d0d954c",
"assets/assets/images/CouponIconFromCreate/random_reward_coupon.png": "5c7abc039d95de27c538d8f97c8f03a1",
"assets/assets/images/CouponIconFromCreate/random_reward_coupon_1.png": "488e2b39bc5018a1b4a603c34065ca82",
"assets/assets/images/CouponIconFromCreate/random_reward_coupon_2.png": "d8c3a0a34d8984c80ea78bc1f65b9934",
"assets/assets/images/CouponIconFromCreate/stackable_coupon.png": "000ed2ce18bef5456483f1fef6c6105c",
"assets/assets/images/CouponIconFromCreate/stackable_coupon_1.png": "f72ce140084cca37e0b2150e122b84c3",
"assets/assets/images/CouponIconFromCreate/stackable_coupon_2.png": "55e2809b8ba017f47658b2ef0163bea7",
"assets/assets/images/CouponIconFromCreate/threshold_discount_coupon.png": "24746de305cf4d8cd418368257be142b",
"assets/assets/images/CouponIconFromCreate/threshold_discount_coupon_2.png": "56bdc6cbccb80df2c39e32fc6c3ff5f1",
"assets/assets/images/CouponIconFromCreate/threshold_gift_coupon.png": "86128a9439198d702e233dabc52b9b9b",
"assets/assets/images/CouponIconFromCreate/threshold_gift_coupon_1.png": "27b62e142e8effa78107ce495953ebbb",
"assets/assets/images/CouponIconFromCreate/threshold_gift_coupon_2.png": "b872f3c3812c49857efb87f3adb5d1e4",
"assets/assets/images/CouponIconFromCreate/threshold_money_coupon_1.png": "9a2bc7073d7529a1ac2dda9657e47091",
"assets/assets/images/coupon_count_logo.png": "5c20921d103ce77ac0699f72a6a051a6",
"assets/assets/images/coupon_type.png": "3711b6b653c3d85b07aaec1732adbca9",
"assets/assets/images/coupoz_1024.png": "a3c5d1576a2b5a26861dc7168ee26216",
"assets/assets/images/coupoz_450.png": "d4d8196ca507bf7d941c8087b94d4a2d",
"assets/assets/images/coupoz_50.png": "a10d5457237f7514c57f1d26e787acd5",
"assets/assets/images/coupoz_512.png": "b3249838086cd861f2078212d51d9721",
"assets/assets/images/coupoz_business.png": "7a099fc12789677a45693ce34d35b854",
"assets/assets/images/coupoz_business_1.svg": "113830a1387de9a4e876309ff93ab20f",
"assets/assets/images/coupoz_business_500x1024.png": "6d9002783836b911f4fd760db40aba73",
"assets/assets/images/coupoz_business_512.png": "82bbd2acb2a74a0e6520ba5d17f24dc7",
"assets/assets/images/coupoz_business_for_icon.png": "13e65aacb65b39157ad02beea5aa8060",
"assets/assets/images/coupoz_business_for_icon_svg.svg": "5aef3c17ecbbef31dd75308207ad0213",
"assets/assets/images/coupoz_icon.ico": "1b179aacb93aae513b75c7d36911c98c",
"assets/assets/images/coupoz_logo.png": "d0455f08e66721684802a074e29cc7d6",
"assets/assets/images/coupoz_logo2.png": "4b220835c41ec1df98fe61c66cf87e81",
"assets/assets/images/coupoz_logo512x512.png": "d88d9705a79b14c25b3ec71df660c537",
"assets/assets/images/coupoz_title.png": "ae8846f9aa5fa0f35b9b5b9758f52564",
"assets/assets/images/create_new.png": "812f509ff2ce7fac849d76a99b467e6e",
"assets/assets/images/dashboard.png": "ce37eb5237f70224759330f0520de185",
"assets/assets/images/discount_icon.png": "b249ca74905b80c01a86d706f9a139a4",
"assets/assets/images/dotnet_bot.svg": "07f67da78b3c8c6dbe2d016762b17fd8",
"assets/assets/images/expiration_data.png": "ded8d706ca8cdbf137bda3d00a4075b2",
"assets/assets/images/expiration_time.png": "6023904bd539484dc60edad989e23a9c",
"assets/assets/images/fix_price_coupon_logo.png": "7e3f3bd047a4f53313a53a781399704b",
"assets/assets/images/gift_coupon_logo.png": "e11ae55b77163a110a0aecc00a42fe0b",
"assets/assets/images/home.png": "7c766c01a58d1f81c0fe7958bbd9c9cc",
"assets/assets/images/icon_facebook.png": "07128017f33c53af1252f0167275ae78",
"assets/assets/images/icon_google.png": "3e26049d9396f49912688a986b4027b8",
"assets/assets/images/icon_login.png": "f943e0b5d02f9c20d8bb10a39c91edd1",
"assets/assets/images/id.png": "1295d399fa532b843976fba6d2bcda85",
"assets/assets/images/locationmark.png": "a05f400fdda1c77a0ef1fda9f00f68c4",
"assets/assets/images/lock.jpg": "b1cca6ecfdd7aae0a6772c55b4f9fc47",
"assets/assets/images/locked_with_key.png": "1167f4767306c60254ed09b1a1edb5aa",
"assets/assets/images/mystery_coupon1.png": "23c16c67c41942776715a05b677e8d73",
"assets/assets/images/number_of_item.png": "0ec4dd7a17198c3bc0947a549baa2982",
"assets/assets/images/price_and_details.png": "777dd7fdb070fd37b397746811e90e72",
"assets/assets/images/product_id.png": "12093ac5f23f622c2f6935f19cf2d5ed",
"assets/assets/images/product_info.png": "a66a8a1a91d8b42b9dd1b18cb1be05be",
"assets/assets/images/product_name.png": "d6a24649416b01a0c372dd941adc9b3a",
"assets/assets/images/product_price.png": "64ca6bb59c0f83f4b7a039b0b78fc7cc",
"assets/assets/images/settings.png": "8cc7034f670b37bac4f5c887bfd9461c",
"assets/assets/images/sparkles.png": "39729b92b5d9fe4457bc5e895ca08cd3",
"assets/assets/images/splash_img.png": "8c6be7cac1cbd677d1ca68cfbc0cae3f",
"assets/assets/images/threshold_money_coupon_logo.png": "49351692afb6289b6bea2450bba1ed47",
"assets/assets/images/tip.png": "d103a61e5b237fd69313b0325274a93b",
"assets/assets/images/usage_limits.png": "d547147d3000ba613c7de1fb0810c393",
"assets/assets/images/user1.png": "fbb1388c6ec5fcd975b210b4773b4ac3",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "6d58f4907f0fb536199e62a86704bb5c",
"assets/NOTICES": "09e687fa2599ed19ed96cfe5a6cbfeb2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "30250cd664bb3491813105f814290e2e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6bb725cfdf43e6c0f2952312a388c4e4",
"/": "6bb725cfdf43e6c0f2952312a388c4e4",
"main.dart.js": "1d4bfffc4747ade5aab38825eefb0bb5",
"manifest.json": "bef96692f31b3b0689a8bc647e2f9711",
"version.json": "4a36d29b9f98b5fcd667f458d586ae50"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
