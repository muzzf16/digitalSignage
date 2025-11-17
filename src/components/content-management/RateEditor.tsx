import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Save } from 'lucide-react'
import { InterestRate } from '@/lib/types'

type RateEditorProps = {
  rate?: InterestRate | null;
  onSave: (rate: Omit<InterestRate, 'id' | 'updatedAt'>) => void;
  onCancel: () => void;
};

export function RateEditor({ rate, onSave, onCancel }: RateEditorProps) {
  const [formData, setFormData] = useState(rate || {
    type: '',
    rate: '',
    period: 'p.a',
    isActive: true,
  })

  const handleSave = () => {
    const { id, updatedAt, ...rest } = formData as InterestRate;
    onSave(rest);
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="type">Jenis Produk</Label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          placeholder="Masukkan jenis produk"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rate">Suku Bunga</Label>
          <Input
            id="rate"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            placeholder="Contoh: 6.00%"
          />
        </div>
        <div>
          <Label htmlFor="period">Periode</Label>
          <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="p.a">Per Annum (p.a)</SelectItem>
              <SelectItem value="p.m">Per Month (p.m)</SelectItem>
              <SelectItem value="p.q">Per Quarter (p.q)</SelectItem>
            </SelectContent>
          </Select>
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
