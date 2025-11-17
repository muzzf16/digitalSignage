import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Save } from 'lucide-react'
import { ExchangeRate } from '@/lib/types'

type ExchangeRateEditorProps = {
  exchangeRate?: ExchangeRate | null;
  onSave: (exchangeRate: Omit<ExchangeRate, 'id' | 'updatedAt'>) => void;
  onCancel: () => void;
};

export function ExchangeRateEditor({ exchangeRate, onSave, onCancel }: ExchangeRateEditorProps) {
  const [formData, setFormData] = useState(exchangeRate || {
    currency: '',
    code: '',
    buy: 0,
    sell: 0,
    change: 0,
    changePercent: 0,
    isActive: true,
  })

  const handleSave = () => {
    const { id, updatedAt, ...rest } = formData as ExchangeRate;
    onSave(rest);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currency">Nama Mata Uang</Label>
          <Input
            id="currency"
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            placeholder="Contoh: US Dollar"
          />
        </div>
        <div>
          <Label htmlFor="code">Kode</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="Contoh: USD"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="buy">Harga Beli</Label>
          <Input
            id="buy"
            type="number"
            step="0.01"
            value={formData.buy}
            onChange={(e) => setFormData({ ...formData, buy: parseFloat(e.target.value) || 0 })}
            placeholder="Harga beli"
          />
        </div>
        <div>
          <Label htmlFor="sell">Harga Jual</Label>
          <Input
            id="sell"
            type="number"
            step="0.01"
            value={formData.sell}
            onChange={(e) => setFormData({ ...formData, sell: parseFloat(e.target.value) || 0 })}
            placeholder="Harga jual"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="change">Perubahan</Label>
          <Input
            id="change"
            type="number"
            step="0.01"
            value={formData.change}
            onChange={(e) => setFormData({ ...formData, change: parseFloat(e.target.value) || 0 })}
            placeholder="Perubahan"
          />
        </div>
        <div>
          <Label htmlFor="changePercent">Perubahan Persen</Label>
          <Input
            id="changePercent"
            type="number"
            step="0.01"
            value={formData.changePercent}
            onChange={(e) => setFormData({ ...formData, changePercent: parseFloat(e.target.value) || 0 })}
            placeholder="Perubahan persen"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="isActive">Aktif</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Simpan
        </Button>
      </div>
    </div>
  )
}
