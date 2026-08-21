const invoiceForm = document.getElementById('invoiceForm');
const itemInput = document.getElementById('item');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const itemTable = document.getElementById('itemTable');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const clientNameInput = document.getElementById('clientName');
const invoiceNumberInput = document.getElementById('invoiceNumberInput');
const companyLogoInput = document.getElementById('companyLogo');
const companyNameInput = document.getElementById('companyName');
const invoicePreview = document.getElementById('invoicePreview');
const previewModal = document.getElementById('previewModal');
const printBtn = document.getElementById('printBtn');
const exportBtn = document.getElementById('exportBtn');
const printArea = document.getElementById('printArea');

let items = [];

invoiceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const itemName = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value) || 0;
  const price = parseFloat(priceInput.value) || 0;
  
  if (!itemName || quantity <= 0 || price <= 0) {
    alert('Isi semua field dengan benar');
    return;
  }
  
  const subtotal = quantity * price;
  
  items.push({
    name: itemName,
    quantity: quantity,
    price: price,
    subtotal: subtotal
  });
  
  updateTable();
  updateSummary();
  resetForm();
});

function updateTable() {
  if (items.length === 0) {
    itemTable.innerHTML = `<tr class="text-center py-8">
      <td colspan="5" class="text-slate-500 py-8">Belum ada item. Tambahkan item terlebih dahulu.</td>
    </tr>`;
    return;
  }
  
  let rows = '';
  items.forEach((item, index) => {
    rows += `
      <tr class="border-b border-slate-100 hover:bg-slate-50">
        <td class="py-3 px-4">${item.name}</td>
        <td class="text-center py-3 px-4">${item.quantity}</td>
        <td class="text-right py-3 px-4">${formatCurrency(item.price)}</td>
        <td class="text-right py-3 px-4 font-medium text-yellow-600">${formatCurrency(item.subtotal)}</td>
        <td class="text-center py-3 px-4">
          <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 rounded-full transition">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
  
  itemTable.innerHTML = rows;
}

function removeItem(index) {
  items.splice(index, 1);
  updateTable();
  updateSummary();
}

function updateSummary() {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const total = subtotal;
  
  subtotalEl.textContent = formatCurrency(subtotal);
  totalEl.textContent = formatCurrency(total);
}

function resetForm() {
  itemInput.value = '';
  quantityInput.value = '1';
  priceInput.value = '';
  itemInput.focus();
}

function formatCurrency(value) {
  return 'Rp ' + value.toLocaleString('id-ID');
}

let companyLogoBase64 = '';

companyLogoInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      companyLogoBase64 = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function openPreview() {
  if (items.length === 0) {
    alert('Tambahkan minimal 1 item terlebih dahulu');
    return;
  }
  
  const clientName = clientNameInput.value.trim() || 'Klien';
  const invoiceNumber = invoiceNumberInput.value.trim() || 'INV-' + Date.now().toString().slice(-6);
  const companyLogo = companyLogoBase64;
  const companyName = companyNameInput.value.trim() || 'My Company';
  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const invoiceHTML = `
    <div class="invoice-container p-12 bg-white" style="min-height: 297mm; color: #000;">
      <div class="flex justify-between items-start mb-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            ${companyLogo ? `<img src="${companyLogo}" class="w-12 h-12 object-contain rounded-lg" onerror="this.style.display='none'">` : `
            <div class="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <i class="fas fa-receipt text-black text-xl"></i>
            </div>`}
            <div>
              <h1 class="text-2xl font-bold text-black">${companyName}</h1>
            </div>
          </div>
        </div>
        
        <div class="text-right">
          <h2 class="text-4xl font-black text-slate-200 uppercase tracking-tighter mb-4">Invoice</h2>
          <div class="mb-2">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Nomor</p>
            <p class="text-lg font-bold text-black">${invoiceNumber}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Tanggal</p>
            <p class="font-medium text-black">${date}</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-8 mb-12">
        <div>
          <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Ditagihkan Kepada:</p>
          <p class="text-lg font-bold text-black">${clientName}</p>
        </div>
      </div>
      
      <table class="w-full mb-12 border-collapse">
        <thead>
          <tr class="bg-black text-white">
            <th class="text-left py-3 px-4 text-xs uppercase font-bold tracking-wider rounded-l-lg">Deskripsi</th>
            <th class="text-center py-3 px-4 text-xs uppercase font-bold tracking-wider">Jumlah</th>
            <th class="text-right py-3 px-4 text-xs uppercase font-bold tracking-wider">Harga</th>
            <th class="text-right py-3 px-4 text-xs uppercase font-bold tracking-wider rounded-r-lg">Total</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${items.map((item) => `
            <tr>
              <td class="py-4 px-4 font-medium text-black">${item.name}</td>
              <td class="text-center py-4 px-4 text-slate-600">${item.quantity}</td>
              <td class="text-right py-4 px-4 text-slate-600">${formatCurrency(item.price)}</td>
              <td class="text-right py-4 px-4 font-bold text-yellow-600">${formatCurrency(item.subtotal)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="flex justify-end pt-8">
        <div class="w-64 space-y-3">
          <div class="flex justify-between items-center pb-3 border-b border-slate-200">
            <span class="text-slate-600 font-medium">Subtotal</span>
            <span class="text-black font-bold">${formatCurrency(items.reduce((sum, item) => sum + item.subtotal, 0))}</span>
          </div>
          <div class="flex justify-between items-center pt-2">
            <span class="text-black text-xl font-black uppercase tracking-wider">Total</span>
            <span class="text-yellow-600 text-2xl font-black">${formatCurrency(items.reduce((sum, item) => sum + item.subtotal, 0))}</span>
          </div>
        </div>
      </div>
      
      <div class="mt-24 pt-8 border-t border-slate-200">
        <p class="text-xs text-slate-600 font-medium text-center italic">Terima kasih atas kerja sama Anda.</p>
      </div>
    </div>
  `;
  
  invoicePreview.innerHTML = invoiceHTML;
  printArea.innerHTML = invoiceHTML;
  previewModal.classList.remove('hidden');
  
  saveInvoice({
    number: invoiceNumber,
    client: clientName,
    date: date,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
    status: 'Menunggu',
    timestamp: Date.now()
  });
}

function closePreview() {
  previewModal.classList.add('hidden');
}

function printInvoice() {
  const printContent = document.getElementById('invoicePreview');
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${new Date().toLocaleDateString('id-ID')}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @page { 
            size: A4; 
            margin: 20mm; 
          }
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            background: white; 
          }
          .invoice-container { 
            min-height: 297mm; 
            color: black; 
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

function exportPDF() {
  const printContent = document.getElementById('invoicePreview');
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${new Date().toLocaleDateString('id-ID')}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @media print {
            @page {
              size: A4; 
              margin: 20mm; 
            }
            body {
              margin: 0; 
              padding: 0; 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              background: white;
            }
            .invoice-container {
              min-height: 297mm;
              color: black;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

let invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
let currentView = 'generator';

function switchView(view) {
  currentView = view;
  const genView = document.getElementById('generatorView');
  const dashView = document.getElementById('dashboardView');
  const navGen = document.getElementById('navGenerator');
  const navDash = document.getElementById('navDashboard');

  if (view === 'generator') {
    genView.style.display = 'grid';
    dashView.style.display = 'none';
    navGen.className = 'px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-sm';
    navDash.className = 'px-4 py-2 bg-transparent text-sm font-medium flex items-center gap-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer';
  } else {
    genView.style.display = 'none';
    dashView.style.display = 'block';
    navDash.className = 'px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-sm';
    navGen.className = 'px-4 py-2 bg-transparent text-sm font-medium flex items-center gap-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer';
    renderDashboard();
  }
}

function saveInvoice(data) {
  const index = invoices.findIndex(inv => inv.number === data.number);
  if (index !== -1) {
    invoices[index] = data;
  } else {
    invoices.push(data);
  }
  localStorage.setItem('invoices', JSON.stringify(invoices));
}

function openPreview() {
  if (items.length === 0) {
    alert('Tambahkan minimal 1 item terlebih dahulu');
    return;
  }
  
  const clientName = clientNameInput.value.trim() || 'Klien';
  const invoiceNumber = invoiceNumberInput.value.trim() || 'INV-' + Date.now().toString().slice(-6);
  const companyLogo = companyLogoBase64;
  const companyName = companyNameInput.value.trim() || 'My Company';
  const today = new Date();
  const dateIso = today.toISOString().split('T')[0];
  const dateStr = today.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
  
  const invoiceHTML = `
    <div class="invoice-container p-12 bg-white" style="min-height: 297mm; color: #000;">
      <div class="flex justify-between items-start mb-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            ${companyLogo ? `<img src="${companyLogo}" class="w-12 h-12 object-contain rounded-lg" onerror="this.style.display='none'">` : `
            <div class="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <i class="fas fa-receipt text-black text-xl"></i>
            </div>`}
            <div>
              <h1 class="text-2xl font-bold text-black">${companyName}</h1>
            </div>
          </div>
        </div>
        
        <div class="text-right">
          <h2 class="text-4xl font-black text-slate-200 uppercase tracking-tighter mb-4">Invoice</h2>
          <div class="mb-2">
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Nomor</p>
            <p class="text-lg font-bold text-black">${invoiceNumber}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Tanggal</p>
            <p class="font-medium text-black">${dateStr}</p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-8 mb-12">
        <div>
          <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Ditagihkan Kepada:</p>
          <p class="text-lg font-bold text-black">${clientName}</p>
        </div>
      </div>
      
      <table class="w-full mb-12 border-collapse">
        <thead>
          <tr class="bg-black text-white">
            <th class="text-left py-3 px-4 text-xs uppercase font-bold tracking-wider rounded-l-lg">Deskripsi</th>
            <th class="text-center py-3 px-4 text-xs uppercase font-bold tracking-wider">Jumlah</th>
            <th class="text-right py-3 px-4 text-xs uppercase font-bold tracking-wider">Harga</th>
            <th class="text-right py-3 px-4 text-xs uppercase font-bold tracking-wider rounded-r-lg">Total</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${items.map((item) => `
            <tr>
              <td class="py-4 px-4 font-medium text-black">${item.name}</td>
              <td class="text-center py-4 px-4 text-slate-600">${item.quantity}</td>
              <td class="text-right py-4 px-4 text-slate-600">${formatCurrency(item.price)}</td>
              <td class="text-right py-4 px-4 font-bold text-yellow-600">${formatCurrency(item.subtotal)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="flex justify-end pt-8">
        <div class="w-64 space-y-3">
          <div class="flex justify-between items-center pb-3 border-b border-slate-200">
            <span class="text-slate-600 font-medium">Subtotal</span>
            <span class="text-black font-bold">${formatCurrency(totalAmount)}</span>
          </div>
          <div class="flex justify-between items-center pt-2">
            <span class="text-black text-xl font-black uppercase tracking-wider">Total</span>
            <span class="text-yellow-600 text-2xl font-black">${formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>
      
      <div class="mt-24 pt-8 border-t border-slate-200">
        <p class="text-xs text-slate-600 font-medium text-center italic">Terima kasih atas kerja sama Anda.</p>
      </div>
    </div>
  `;
  
  invoicePreview.innerHTML = invoiceHTML;
  printArea.innerHTML = invoiceHTML;
  previewModal.classList.remove('hidden');

  saveInvoice({
    number: invoiceNumber,
    client: clientName,
    date: dateStr,
    dateIso: dateIso,
    total: totalAmount,
    status: 'Menunggu'
  });
}

function getFilteredInvoices() {
  const filterFrom = document.getElementById('filterDateFrom')?.value;
  const filterTo = document.getElementById('filterDateTo')?.value;
  const filterStatus = document.getElementById('filterStatus')?.value;

  return invoices.filter(inv => {
    let matchDate = true;
    let matchStatus = true;

    if (filterFrom && filterTo) {
      matchDate = inv.dateIso >= filterFrom && inv.dateIso <= filterTo;
    } else if (filterFrom) {
      matchDate = inv.dateIso >= filterFrom;
    } else if (filterTo) {
      matchDate = inv.dateIso <= filterTo;
    }

    if (filterStatus) {
      matchStatus = inv.status === filterStatus;
    }

    return matchDate && matchStatus;
  });
}

function applyFilters() {
  renderDashboard();
}

function resetFilters() {
  if (document.getElementById('filterDateFrom')) document.getElementById('filterDateFrom').value = '';
  if (document.getElementById('filterDateTo')) document.getElementById('filterDateTo').value = '';
  if (document.getElementById('filterStatus')) document.getElementById('filterStatus').value = '';
  renderDashboard();
}

function renderDashboard() {
  const tbody = document.getElementById('dashboardBody');
  if (!tbody) return;
  
  const list = getFilteredInvoices();

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-slate-500 py-8">Belum ada data invoice yang sesuai.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((inv, i) => {
    const originalIndex = invoices.findIndex(item => item.number === inv.number);
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3 px-4 text-slate-500">${i + 1}</td>
        <td class="py-3 px-4 font-bold text-slate-900">${inv.number}</td>
        <td class="py-3 px-4 text-slate-700">${inv.client}</td>
        <td class="py-3 px-4 text-slate-600">${inv.date}</td>
        <td class="py-3 px-4 text-right font-bold text-yellow-600">${formatCurrency(inv.total)}</td>
        <td class="py-3 px-4 text-center">
          <select onchange="updateStatus(${originalIndex}, this.value)" class="border border-slate-300 rounded-lg px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white">
            <option value="Lunas" ${inv.status === 'Lunas' ? 'selected' : ''}>Lunas</option>
            <option value="Menunggu" ${inv.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
            <option value="Dibatalkan" ${inv.status === 'Dibatalkan' ? 'selected' : ''}>Dibatalkan</option>
          </select>
        </td>
        <td class="py-3 px-4 text-center">
          <button onclick="deleteInvoice(${originalIndex})" class="text-red-500 hover:text-red-700 p-2 transition">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function deleteInvoice(index) {
  if (confirm('Hapus data invoice ini?')) {
    invoices.splice(index, 1);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    renderDashboard();
  }
}

function updateStatus(index, status) {
  invoices[index].status = status;
  localStorage.setItem('invoices', JSON.stringify(invoices));
  renderDashboard();
}

function exportCSV() {
  const list = getFilteredInvoices();
  if (list.length === 0) {
    alert('Tidak ada data untuk diekspor');
    return;
  }
  const headers = ['No', 'Nomor Invoice', 'Klien', 'Tanggal', 'Total', 'Status'];
  const rows = list.map((inv, i) => [
    i + 1,
    inv.number,
    inv.client,
    inv.date,
    inv.total,
    inv.status
  ]);
  let csv = headers.join(',') + '\n';
  csv += rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `dashboard-pembayaran-${Date.now()}.csv`;
  link.click();
}

// Ensure default view tab style applied at initialization
document.addEventListener('DOMContentLoaded', () => {
  switchView('generator');
});

window.removeItem = removeItem;
window.openPreview = openPreview;
window.closePreview = closePreview;
window.printInvoice = printInvoice;
window.exportPDF = exportPDF;
window.updateStatus = updateStatus;
window.exportCSV = exportCSV;
window.switchView = switchView;
window.deleteInvoice = deleteInvoice;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;