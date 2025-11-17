import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Save, X } from 'lucide-react'
import { Slide } from '@/lib/types'

type SlideEditorProps = {
  slide?: Slide | null;
  onSave: (slide: Slide) => void;
  onCancel: () => void;
  slides: Slide[];
};

export function SlideEditor({ slide, onSave, onCancel, slides }: SlideEditorProps) {
  const [formData, setFormData] = useState<Slide>(slide || {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    features: [''],
    backgroundColor: 'from-orange-500 to-orange-600',
    textColor: 'text-white',
    isActive: true,
    order: slides.length + 1,
    category: 'Promo',
    createdAt: '',
    updatedAt: ''
  })

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Judul Slide</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Masukkan judul slide"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Masukkan subtitle slide"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Masukkan deskripsi slide"
          rows={3}
        />
      </div>

      <div>
        <Label>Fitur-fitur</Label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Fitur ${index + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFeature(index)}
                disabled={formData.features.length === 1}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addFeature} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Fitur
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Kategori</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Promo">Promo</SelectItem>
              <SelectItem value="Kredit">Kredit</SelectItem>
              <SelectItem value="Tabungan">Tabungan</SelectItem>
              <SelectItem value="Layanan">Layanan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="backgroundColor">Warna Background</Label>
          <Select value={formData.backgroundColor} onValueChange={(value) => setFormData({ ...formData, backgroundColor: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih warna background" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="from-orange-500 to-orange-600">Orange Gradient</SelectItem>
              <SelectItem value="from-orange-600 to-red-500">Orange-Red Gradient</SelectItem>
              <SelectItem value="from-yellow-500 to-orange-500">Yellow-Orange Gradient</SelectItem>
              <SelectItem value="from-green-600 to-green-800">Hijau Gradient</SelectItem>
              <SelectItem value="from-blue-600 to-blue-800">Biru Gradient</SelectItem>
              <SelectItem value="from-purple-600 to-purple-800">Ungu Gradient</SelectItem>
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
        <Label htmlFor="isActive">Slide Aktif</Label>
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
