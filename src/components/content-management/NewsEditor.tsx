import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Save } from 'lucide-react'
import { News } from '@/lib/types'

type NewsEditorProps = {
  newsItem?: News | null;
  onSave: (newsItem: News) => void;
  onCancel: () => void;
};

export function NewsEditor({ newsItem, onSave, onCancel }: NewsEditorProps) {
  const [formData, setFormData] = useState<News>(newsItem || {
    id: '',
    title: '',
    description: '',
    category: 'news',
    date: new Date().toLocaleDateString('id-ID'),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Masukkan judul berita"
        />
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Masukkan deskripsi berita"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Kategori</Label>
          <Select value={formData.category} onValueChange={(value: 'news' | 'promo' | 'announcement') => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">Berita</SelectItem>
              <SelectItem value="promo">Promo</SelectItem>
              <SelectItem value="announcement">Pengumuman</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Tanggal</Label>
          <Input
            id="date"
            type="date"
            value={formData.date.split(' ')[0]} // Only date part for input
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
        <Button onClick={() => onSave(formData)}>
          <Save className="w-4 h-4 mr-2" />
          Simpan
        </Button>
      </div>
    </div>
  )
}
