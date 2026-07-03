/*
 * Parla Gayrimenkul - basit tarayıcı depolama katmanı (localStorage tabanlı).
 *
 * Bu dosya, ilan-giris.html ve index.html tarafından ortak kullanılan
 * window.storage nesnesini gerçek tarayıcı localStorage API'si üzerinden
 * sağlar. Statik bir site (GitHub Pages vb.) olduğu için gerçek bir
 * veritabanı yoktur: kayıtlar SADECE kaydı oluşturan tarayıcıda saklanır.
 * Bu, tek danışman/tek admin kullanımı için pratik bir demo çözümdür;
 * birden fazla kişinin aynı anda ilan girip herkesin görmesi gereken
 * gerçek (çok kullanıcılı) bir sistem için bir backend + veritabanı
 * (örn. Firebase, Supabase, kendi API'niz) gerekir.
 */
(function () {
  function safeGet(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : raw;
    } catch (e) {
      return null;
    }
  }

  window.storage = {
    async set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.error('storage.set hata:', e);
        return false;
      }
    },

    async get(key) {
      const value = safeGet(key);
      if (value === null) return null;
      return { value };
    },

    async delete(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },

    async list(prefix) {
      try {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
        return { keys };
      } catch (e) {
        return { keys: [] };
      }
    }
  };
})();
