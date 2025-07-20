document.addEventListener("alpine:init", () => {
  Alpine.data("beli", () => ({
    items: [
      { id: 1, name: "rasa keju", img: "1.jpg", price: 15000 },
      { id: 2, name: "rasa jeruk", img: "2.jpg", price: 15000 },
      { id: 3, name: "rasa BBQ", img: "3.jpg", price: 15000 },
      { id: 4, name: "rasa Pedas", img: "4.jpg", price: 15000 },
      { id: 5, name: "rasa Asin", img: "5.jpg", price: 15000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    totaljumlah: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di dalam cart
      const cartitem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada barang di cart atau masih kosong
      if (!cartitem) {
        this.items.push({ ...newItem, totaljumlah: 1, total: newItem.price });
        this.totaljumlah++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang tersebut beda atau sama dengan yang ada di dalam cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada , tambahkan totaljumalh dan total nya
            item.totaljumlah++;
            item.total = item.price * item.totaljumlah;
            this.totaljumlah++;
            this.total += item.price;
            return item;
          }
        });
      }

      console.log(this.total);
    },
    remove(id) {
      // a
      const cartitem = this.items.find((item) => item.id === id);

      if (cartitem.totaljumlah > 1) {
        // ad
        this.items = this.items.map((item) => {
          //
          if (item.id !== id) {
            return item;
          } else {
            item.totaljumlah--;
            item.total = item.price * item.totaljumlah;
            this.totaljumlah--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartitem.totaljumlah === 1) {
        //
        this.items = this.items.filter((item) => item.id !== id);
        this.totaljumlah--;
        this.total -= cartitem.price;
      }
    },
    get orderMessage() {
      return encodeURI(
        `Halo, saya ingin memesan:\n\n` +
          this.items
            .map(
              (item) =>
                `${item.name} (${item.totaljumlah} pcs) - ${rupiah(item.total)}`
            )
            .join("\n") +
          `\n\nTotal: ${rupiah(this.total)}\n\nTerima kasih!`
      );
    },
  });
});

//konversi ke rupiah
const rupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};
