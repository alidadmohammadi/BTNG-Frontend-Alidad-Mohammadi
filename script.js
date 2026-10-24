// =====================================================
// WheelWarriors - script.js
// =====================================================

// ---------- 1. Settings and page elements ----------

const API_URL = "https://api-web.dnccudinus.org/api/mobil";

let allCars = [];      // every car received from the API
let currentCars = [];  // the cars currently shown on the page

const carGrid = document.getElementById("carGrid");
const statusMessage = document.getElementById("statusMessage");
const resultsCount = document.getElementById("resultsCount");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const fuelFilter = document.getElementById("fuelFilter");
const transmissionFilter = document.getElementById("transmissionFilter");
const statusFilter = document.getElementById("statusFilter");
const sortSelect = document.getElementById("sortSelect");
const resetButton = document.getElementById("resetButton");
const carModal = document.getElementById("carModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

// ---------- 2. Translations ----------
// To add or change a text: find its key and edit the line for each language.

const translations = {
  // ===== English =====
  en: {
    "page.title": "WheelWarriors | Premium Car Showroom",

    "nav.home": "Home",
    "nav.cars": "Cars",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Visit Us",

    "hero.eyebrow": "Premium Car Showroom",
    "hero.title": "Drive the Car You Deserve",
    "hero.text": "Explore our hand-picked collection of quality cars, from family favourites to electric performance.",
    "hero.button": "Explore the Collection",

    "cars.title": "Our Collection",
    "cars.subtitle": "Find your next car using search, filters and sorting.",

    "controls.searchPlaceholder": "Search by name or brand",
    "controls.allBrands": "All brands",
    "controls.allFuels": "All fuel types",
    "controls.allTransmissions": "All transmissions",
    "controls.allStatuses": "All availability",
    "controls.sortDefault": "Sort: Default",
    "controls.sortPriceAsc": "Price: Low to High",
    "controls.sortPriceDesc": "Price: High to Low",
    "controls.sortYearDesc": "Year: Newest first",
    "controls.reset": "Reset",

    "about.title": "About WheelWarriors",
    "about.text1": "WheelWarriors is a modern car showroom built around trust, transparency and a passion for great cars.",
    "about.text2": "Every car in our collection is carefully selected so you can compare options clearly and choose with confidence.",

    "contact.title": "Ready to Find Your Car?",
    "contact.text": "Get in touch with our team. We are happy to answer your questions and arrange a visit.",
    "contact.button": "Email Us",

    "footer.tagline": "Premium cars. Honest service.",
    "footer.rights": "All rights reserved.",

    "msg.loading": "Loading cars...",
    "msg.error": "Sorry, we could not load the cars. Please check your connection and try again.",
    "msg.retry": "Try again",
    "msg.empty": "No cars to show right now.",

    "status.available": "Available",
    "status.sold": "Sold",
    "card.noImage": "No image available",
    "results.showing": "Showing {shown} of {total}",

    "card.details": "View details",
    "msg.noMatch": "No cars match your search. Try changing or resetting the filters.",
    "modal.brand": "Brand",
    "modal.year": "Year",
    "modal.transmission": "Transmission",
    "modal.fuel": "Fuel type",
    "modal.status": "Availability",
    "modal.price": "Price",
    "modal.contact": "Ask about this car",
    "modal.close": "Close",
    "aria.menu": "Toggle menu",
    "aria.language": "Language",
    "aria.sort": "Sort cars",
    "hero.alt": "A car in the WheelWarriors showroom"
  },

  // ===== Bahasa Indonesia =====
  id: {
    "page.title": "WheelWarriors | Showroom Mobil Premium",

    "nav.home": "Beranda",
    "nav.cars": "Mobil",
    "nav.about": "Tentang",
    "nav.contact": "Kontak",
    "nav.cta": "Kunjungi Kami",

    "hero.eyebrow": "Showroom Mobil Premium",
    "hero.title": "Kendarai Mobil yang Layak Anda Dapatkan",
    "hero.text": "Jelajahi koleksi mobil berkualitas pilihan kami, mulai dari favorit keluarga hingga performa listrik.",
    "hero.button": "Jelajahi Koleksi",

    "cars.title": "Koleksi Kami",
    "cars.subtitle": "Temukan mobil impian Anda dengan pencarian, filter, dan pengurutan.",

    "controls.searchPlaceholder": "Cari berdasarkan nama atau merek",
    "controls.allBrands": "Semua merek",
    "controls.allFuels": "Semua jenis bahan bakar",
    "controls.allTransmissions": "Semua transmisi",
    "controls.allStatuses": "Semua ketersediaan",
    "controls.sortDefault": "Urutkan: Default",
    "controls.sortPriceAsc": "Harga: Terendah ke Tertinggi",
    "controls.sortPriceDesc": "Harga: Tertinggi ke Terendah",
    "controls.sortYearDesc": "Tahun: Terbaru dulu",
    "controls.reset": "Atur Ulang",

    "about.title": "Tentang WheelWarriors",
    "about.text1": "WheelWarriors adalah showroom mobil modern yang dibangun di atas kepercayaan, transparansi, dan kecintaan pada mobil-mobil terbaik.",
    "about.text2": "Setiap mobil dalam koleksi kami dipilih dengan cermat sehingga Anda dapat membandingkan pilihan dengan jelas dan memutuskan dengan percaya diri.",

    "contact.title": "Siap Menemukan Mobil Anda?",
    "contact.text": "Hubungi tim kami. Kami siap menjawab pertanyaan Anda dan mengatur kunjungan.",
    "contact.button": "Kirim Email",

    "footer.tagline": "Mobil premium. Layanan jujur.",
    "footer.rights": "Hak cipta dilindungi.",

    "msg.loading": "Memuat mobil...",
    "msg.error": "Maaf, mobil tidak dapat dimuat. Periksa koneksi Anda lalu coba lagi.",
    "msg.retry": "Coba lagi",
    "msg.empty": "Belum ada mobil untuk ditampilkan.",

    "status.available": "Tersedia",
    "status.sold": "Terjual",
    "card.noImage": "Gambar tidak tersedia",
    "results.showing": "Menampilkan {shown} dari {total}",

    "card.details": "Lihat detail",
    "msg.noMatch": "Tidak ada mobil yang cocok dengan pencarian Anda. Coba ubah atau atur ulang filter.",
    "modal.brand": "Merek",
    "modal.year": "Tahun",
    "modal.transmission": "Transmisi",
    "modal.fuel": "Jenis bahan bakar",
    "modal.status": "Ketersediaan",
    "modal.price": "Harga",
    "modal.contact": "Tanyakan tentang mobil ini",
    "modal.close": "Tutup",
    "aria.menu": "Buka atau tutup menu",
    "aria.language": "Bahasa",
    "aria.sort": "Urutkan mobil",
    "hero.alt": "Mobil di showroom WheelWarriors"
  },

  // ===== Dari / Farsi (right-to-left) =====
  fa: {
    "page.title": "WheelWarriors | نمایشگاه ممتاز موتر",

    "nav.home": "خانه",
    "nav.cars": "موترها",
    "nav.about": "درباره ما",
    "nav.contact": "تماس",
    "nav.cta": "دیدار با ما",

    "hero.eyebrow": "نمایشگاه ممتاز موتر",
    "hero.title": "موتری را برانید که شایسته آن هستید",
    "hero.text": "مجموعهٔ موترهای باکیفیت و دست‌چین‌شدهٔ ما را ببینید؛ از موترهای محبوب خانوادگی تا موترهای برقی پرقدرت.",
    "hero.button": "مشاهدهٔ مجموعه",

    "cars.title": "مجموعهٔ ما",
    "cars.subtitle": "موتر بعدی خود را با جستجو، فیلتر و مرتب‌سازی پیدا کنید.",

    "controls.searchPlaceholder": "جستجو بر اساس نام یا برند",
    "controls.allBrands": "همهٔ برندها",
    "controls.allFuels": "همهٔ انواع سوخت",
    "controls.allTransmissions": "همهٔ انواع گیربکس",
    "controls.allStatuses": "همهٔ وضعیت‌ها",
    "controls.sortDefault": "مرتب‌سازی: پیش‌فرض",
    "controls.sortPriceAsc": "قیمت: کم به زیاد",
    "controls.sortPriceDesc": "قیمت: زیاد به کم",
    "controls.sortYearDesc": "سال: جدیدترین",
    "controls.reset": "بازنشانی",

    "about.title": "دربارهٔ WheelWarriors",
    "about.text1": "WheelWarriors یک نمایشگاه مدرن موتر است که بر پایهٔ اعتماد، شفافیت و عشق به موترهای عالی ساخته شده است.",
    "about.text2": "هر موتر در مجموعهٔ ما با دقت انتخاب شده است تا بتوانید گزینه‌ها را روشن مقایسه کنید و با اطمینان تصمیم بگیرید.",

    "contact.title": "آماده‌اید موتر خود را پیدا کنید؟",
    "contact.text": "با تیم ما تماس بگیرید. ما با خوشحالی به پرسش‌های شما پاسخ می‌دهیم و دیدار شما را هماهنگ می‌کنیم.",
    "contact.button": "ایمیل بفرستید",

    "footer.tagline": "موترهای ممتاز. خدمات صادقانه.",
    "footer.rights": "تمام حقوق محفوظ است.",

    "msg.loading": "در حال بارگذاری موترها...",
    "msg.error": "متأسفیم، موترها بارگذاری نشدند. لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.",
    "msg.retry": "تلاش دوباره",
    "msg.empty": "در حال حاضر موتری برای نمایش وجود ندارد.",

    "status.available": "موجود",
    "status.sold": "فروخته شده",
    "card.noImage": "تصویر موجود نیست",
    "results.showing": "نمایش {shown} از {total}",

    "card.details": "مشاهدهٔ جزئیات",
    "msg.noMatch": "هیچ موتری با جستجوی شما مطابقت ندارد. فیلترها را تغییر دهید یا بازنشانی کنید.",
    "modal.brand": "برند",
    "modal.year": "سال",
    "modal.transmission": "گیربکس",
    "modal.fuel": "نوع سوخت",
    "modal.status": "وضعیت",
    "modal.price": "قیمت",
    "modal.contact": "دربارهٔ این موتر بپرسید",
    "modal.close": "بستن",
    "aria.menu": "باز و بسته کردن منو",
    "aria.language": "زبان",
    "aria.sort": "مرتب‌سازی موترها",
    "hero.alt": "یک موتر در نمایشگاه WheelWarriors"
  }
};

// Labels for category values that come from the API (transmission and fuel).
// The keys are the API values in lowercase. Unknown values are shown unchanged.
// Car names, brands, years and prices are NEVER translated.
const valueLabels = {
  en: { matic: "Automatic", cvt: "CVT", manual: "Manual",
        bensin: "Petrol", diesel: "Diesel", hybrid: "Hybrid", listrik: "Electric" },
  id: { matic: "Matic", cvt: "CVT", manual: "Manual",
        bensin: "Bensin", diesel: "Diesel", hybrid: "Hybrid", listrik: "Listrik" },
  fa: { matic: "اتومات", cvt: "CVT", manual: "دستی",
        bensin: "بنزین", diesel: "دیزل", hybrid: "هایبرید", listrik: "برقی" }
};

// Page direction and document language for each language
const languageSettings = {
  en: { dir: "ltr", htmlLang: "en" },
  id: { dir: "ltr", htmlLang: "id" },
  fa: { dir: "rtl", htmlLang: "fa-AF" }
};

const LANGUAGE_STORAGE_KEY = "wheelwarriors-language";
let currentLanguage = "en"; // English is the default

// Returns the text for a key in the current language.
// {name} placeholders are replaced using the "variables" object.
function t(key, variables) {
  let text = translations[currentLanguage][key] || translations.en[key] || key;
  if (variables) {
    for (const name in variables) {
      text = text.replace("{" + name + "}", variables[name]);
    }
  }
  return text;
}

// Translates an API category value (like "Listrik"), or returns it unchanged
function translateValue(value) {
  const label = valueLabels[currentLanguage][String(value).toLowerCase()];
  return label || String(value);
}

// ---------- 3. Small helper functions ----------

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function formatPrice(price) {
  const number = Number(price);
  if (!Number.isFinite(number)) return "-";
  return "Rp " + new Intl.NumberFormat("id-ID").format(number);
}

// ---------- 4. Status message (loading / error / empty) ----------
// We remember WHICH message is showing, so we can redraw it
// in a new language when the visitor switches language.

let currentStatus = null; // example: { key: "msg.error", withRetry: true }

function paintStatus() {
  if (!currentStatus) {
    statusMessage.hidden = true;
    statusMessage.textContent = "";
    return;
  }

  statusMessage.textContent = t(currentStatus.key);

  if (currentStatus.withRetry) {
    const retryButton = createElement("button", "btn btn-outline", t("msg.retry"));
    retryButton.type = "button";
    retryButton.addEventListener("click", loadCars);
    statusMessage.appendChild(document.createElement("br"));
    statusMessage.appendChild(retryButton);
  }

  statusMessage.hidden = false;
}

function showStatus(key, withRetryButton) {
  currentStatus = { key: key, withRetry: Boolean(withRetryButton) };
  paintStatus();
}

function hideStatus() {
  currentStatus = null;
  paintStatus();
}

// ---------- 5. Build one car card ----------

function createCarCard(car) {
  const statusValue = String(car.status).toLowerCase();
  const isSold = statusValue === "sold";
  const isAvailable = statusValue === "tersedia";

  const card = createElement("article", isSold ? "car-card car-card--sold" : "car-card");

  // --- Image area ---
  const imageBox = createElement("div", "car-card-image");

  if (car.foto) {
    const image = document.createElement("img");
    image.src = car.foto;
    image.alt = car.nama || "Car";
    image.loading = "lazy";

    image.addEventListener("error", function () {
      image.remove();
      imageBox.classList.add("no-image");
      imageBox.appendChild(createElement("span", "no-image-text", t("card.noImage")));
    });

    imageBox.appendChild(image);
  } else {
    imageBox.classList.add("no-image");
    imageBox.appendChild(createElement("span", "no-image-text", t("card.noImage")));
  }

  let badgeClass = "car-badge car-badge--other";
  let badgeText = car.status || "-";
  if (isAvailable) {
    badgeClass = "car-badge car-badge--available";
    badgeText = t("status.available");
  } else if (isSold) {
    badgeClass = "car-badge car-badge--sold";
    badgeText = t("status.sold");
  }
  imageBox.appendChild(createElement("span", badgeClass, badgeText));

  // --- Text area ---
  const body = createElement("div", "car-card-body");
  body.appendChild(createElement("p", "car-brand", car.brand || "-"));       // original API text
  body.appendChild(createElement("h3", "car-name", car.nama || "-"));        // original API text

  const specs = createElement("div", "car-specs");
  if (car.tahun) specs.appendChild(createElement("span", "car-spec", String(car.tahun)));
  if (car.transmisi) specs.appendChild(createElement("span", "car-spec", translateValue(car.transmisi)));
  if (car.bahan_bakar) specs.appendChild(createElement("span", "car-spec", translateValue(car.bahan_bakar)));
  body.appendChild(specs);

  const footer = createElement("div", "car-card-footer");
  footer.appendChild(createElement("span", "car-price", formatPrice(car.harga)));

  // Button that opens the details window for this car
  const detailsButton = createElement("button", "btn btn-outline btn-small", t("card.details"));
  detailsButton.type = "button";
  detailsButton.setAttribute("aria-label", t("card.details") + ": " + (car.nama || ""));
  detailsButton.addEventListener("click", function () {
    openCarModal(car);
  });
  footer.appendChild(detailsButton);

  body.appendChild(footer);

  card.appendChild(imageBox);
  card.appendChild(body);
  return card;
}

// ---------- 6. Show a list of cars on the page ----------

function renderCars(cars) {
  currentCars = cars;
  carGrid.innerHTML = "";

  // The API itself returned no cars
  if (allCars.length === 0) {
    resultsCount.textContent = "";
    showStatus("msg.empty");
    return;
  }

  resultsCount.textContent = t("results.showing", {
    shown: cars.length,
    total: allCars.length
  });

  // Cars exist, but the search/filters match none of them
  if (cars.length === 0) {
    showStatus("msg.noMatch");
    return;
  }

  hideStatus();
  cars.forEach(function (car) {
    carGrid.appendChild(createCarCard(car));
  });
}

// ---------- 7. Get the cars from the API ----------

async function loadCars() {
  allCars = [];
  currentCars = [];
  carGrid.innerHTML = "";
  resultsCount.textContent = "";
  showStatus("msg.loading");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Server answered with status " + response.status);
    }

    const result = await response.json();
    console.log("API response:", result);

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("The API response has an unexpected format");
    }

    allCars = result.data;
      populateFilters();   // fill the dropdowns using the real car data
    applyFilters();      // show the cars (respecting any current filters)
  } catch (error) {
    console.error("Could not load cars:", error);
    showStatus("msg.error", true);
  }
}

// ---------- 8. Switch language ----------

function applyLanguage(language) {
  if (!translations[language]) language = "en"; // safety: unknown language -> English
  currentLanguage = language;

  // 1) Page direction and document language
  document.documentElement.lang = languageSettings[language].htmlLang;
  document.documentElement.dir = languageSettings[language].dir;
  document.title = t("page.title");

  // 2) Static text: every element marked with data-i18n="..."
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });

  // 3) Placeholders: elements marked with data-i18n-placeholder="..."
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  // 4) Keep the dropdown in sync
  languageSelect.value = language;

  // 5) Remember the choice (try/catch because storage can be blocked)
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Could not save the language choice:", error);
  }

  // 6) Translate accessibility labels and the hero image description
  Object.keys(ariaLabelKeys).forEach(function (id) {
    document.getElementById(id).setAttribute("aria-label", t(ariaLabelKeys[id]));
  });
  document.querySelector(".hero-image").alt = t("hero.alt");

  // 7) Rebuild the filter dropdown options (their labels depend on the language)
  populateFilters();

  // 8) Redraw the dynamic parts (cards, results count, messages)
  if (allCars.length > 0) {
    renderCars(currentCars);
  } else {
    paintStatus();
  }

  // 9) If the details window is open, redraw it in the new language
  if (currentModalCar) {
    renderModalContent(currentModalCar);
  }
}

languageSelect.addEventListener("change", function () {
  applyLanguage(languageSelect.value);
});
// ---------- 8b. Search, filters and sorting ----------

// Which element gets which translated accessibility label
const ariaLabelKeys = {
  menuToggle: "aria.menu",
  languageSelect: "aria.language",
  searchInput: "controls.searchPlaceholder",
  brandFilter: "modal.brand",
  fuelFilter: "modal.fuel",
  transmissionFilter: "modal.transmission",
  statusFilter: "modal.status",
  sortSelect: "aria.sort",
  modalClose: "modal.close"
};

// Turns the API status value into a translated label
function statusLabel(value) {
  const status = String(value).toLowerCase();
  if (status === "tersedia") return t("status.available");
  if (status === "sold") return t("status.sold");
  return String(value);
}

// Returns each different value of a field once, e.g. every brand
function getUniqueValues(field) {
  const values = allCars
    .map(function (car) { return car[field]; })
    .filter(function (value) { return value !== null && value !== undefined && value !== ""; });
  return Array.from(new Set(values));
}

// Builds a list of { value, label } options for a field, sorted by label
function buildOptions(field, labelFunction) {
  return getUniqueValues(field)
    .map(function (value) {
      return { value: String(value), label: labelFunction(value) };
    })
    .sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
}

// Replaces all options of a dropdown except the first one ("All ...")
function fillSelect(select, options) {
  const chosen = select.value;

  while (select.options.length > 1) {
    select.remove(1);
  }

  options.forEach(function (option) {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    select.appendChild(optionElement);
  });

  // Keep the visitor's previous choice if it still exists
  select.value = chosen;
  if (select.value !== chosen) select.value = "all";
}

function populateFilters() {
  fillSelect(brandFilter, buildOptions("brand", function (value) { return String(value); }));
  fillSelect(fuelFilter, buildOptions("bahan_bakar", translateValue));
  fillSelect(transmissionFilter, buildOptions("transmisi", translateValue));
  fillSelect(statusFilter, buildOptions("status", statusLabel));
}

// Reads all controls, filters and sorts the cars, then shows the result
function applyFilters() {
  const searchText = searchInput.value.trim().toLowerCase();

  const result = allCars.filter(function (car) {
    const name = String(car.nama || "").toLowerCase();
    const brand = String(car.brand || "").toLowerCase();

    const matchesSearch = searchText === "" || name.includes(searchText) || brand.includes(searchText);
    const matchesBrand = brandFilter.value === "all" || String(car.brand) === brandFilter.value;
    const matchesFuel = fuelFilter.value === "all" || String(car.bahan_bakar) === fuelFilter.value;
    const matchesTransmission = transmissionFilter.value === "all" || String(car.transmisi) === transmissionFilter.value;
    const matchesStatus = statusFilter.value === "all" || String(car.status) === statusFilter.value;

    return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesStatus;
  });

  // Sorting. "default" keeps the order the API gave us.
  if (sortSelect.value === "price-asc") {
    result.sort(function (a, b) { return (Number(a.harga) || 0) - (Number(b.harga) || 0); });
  } else if (sortSelect.value === "price-desc") {
    result.sort(function (a, b) { return (Number(b.harga) || 0) - (Number(a.harga) || 0); });
  } else if (sortSelect.value === "year-desc") {
    result.sort(function (a, b) { return (Number(b.tahun) || 0) - (Number(a.tahun) || 0); });
  }

  renderCars(result);
}

// Run applyFilters whenever the visitor changes something
searchInput.addEventListener("input", applyFilters);
[brandFilter, fuelFilter, transmissionFilter, statusFilter, sortSelect].forEach(function (select) {
  select.addEventListener("change", applyFilters);
});

resetButton.addEventListener("click", function () {
  searchInput.value = "";
  brandFilter.value = "all";
  fuelFilter.value = "all";
  transmissionFilter.value = "all";
  statusFilter.value = "all";
  sortSelect.value = "default";
  applyFilters();
});

// ---------- 8c. Car details window (modal) ----------

let currentModalCar = null;     // the car currently shown in the window
let lastFocusedElement = null;  // where the keyboard focus was before opening

// One small box: a label on top and a value below
function createModalSpec(label, value, isPrice) {
  const box = createElement("div", "modal-spec");
  box.appendChild(createElement("p", "modal-spec-label", label));

  const valueElement = createElement("p", "modal-spec-value");
  if (isPrice) {
    valueElement.appendChild(createElement("span", "price-ltr", value));
  } else {
    valueElement.textContent = value;
  }
  box.appendChild(valueElement);
  return box;
}

// Builds the inside of the window for one car
function renderModalContent(car) {
  modalContent.innerHTML = "";

  // --- Photo ---
  const imageBox = createElement("div", "modal-image");
  if (car.foto) {
    const image = document.createElement("img");
    image.src = car.foto;
    image.alt = car.nama || "Car";
    image.addEventListener("error", function () {
      image.remove();
      imageBox.classList.add("no-image");
      imageBox.appendChild(createElement("span", "no-image-text", t("card.noImage")));
    });
    imageBox.appendChild(image);
  } else {
    imageBox.classList.add("no-image");
    imageBox.appendChild(createElement("span", "no-image-text", t("card.noImage")));
  }
  modalContent.appendChild(imageBox);

  // --- Text ---
  const body = createElement("div", "modal-body");
  body.appendChild(createElement("p", "car-brand", car.brand || "-"));

  const title = createElement("h3", "modal-title", car.nama || "-");
  title.id = "modalTitle"; // the dialog is labelled by this title
  body.appendChild(title);

  const specs = createElement("div", "modal-specs");
  specs.appendChild(createModalSpec(t("modal.brand"), car.brand || "-"));
  specs.appendChild(createModalSpec(t("modal.year"), car.tahun ? String(car.tahun) : "-"));
  specs.appendChild(createModalSpec(t("modal.transmission"), car.transmisi ? translateValue(car.transmisi) : "-"));
  specs.appendChild(createModalSpec(t("modal.fuel"), car.bahan_bakar ? translateValue(car.bahan_bakar) : "-"));
  specs.appendChild(createModalSpec(t("modal.status"), car.status ? statusLabel(car.status) : "-"));
  specs.appendChild(createModalSpec(t("modal.price"), formatPrice(car.harga), true));
  body.appendChild(specs);

  // Honest button: it only scrolls to our contact section
  const actions = createElement("div", "modal-actions");
  const contactLink = createElement("a", "btn btn-primary", t("modal.contact"));
  contactLink.href = "#contact";
  contactLink.addEventListener("click", function () {
    closeCarModal(false); // the link itself scrolls to the contact section
  });
  actions.appendChild(contactLink);
  body.appendChild(actions);

  modalContent.appendChild(body);
}

function openCarModal(car) {
  currentModalCar = car;
  lastFocusedElement = document.activeElement;
  renderModalContent(car);
  carModal.hidden = false;
  document.body.classList.add("modal-open"); // stops the page scrolling behind
  modalClose.focus();
}

function closeCarModal(restoreFocus) {
  carModal.hidden = true;
  document.body.classList.remove("modal-open");
  currentModalCar = null;
  modalContent.innerHTML = "";
  if (restoreFocus && lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

modalClose.addEventListener("click", function () { closeCarModal(true); });
modalBackdrop.addEventListener("click", function () { closeCarModal(true); });
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !carModal.hidden) {
    closeCarModal(true);
  }
});
// ---------- 9. Mobile menu ----------

menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navMenu.addEventListener("click", function (event) {
  if (event.target.closest("a")) {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- 10. Start! ----------

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
} catch (error) {
  savedLanguage = "en";
}

applyLanguage(savedLanguage); // set the language first...
loadCars();                   // ...then load the cars