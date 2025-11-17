import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { Slide } from '@/lib/types'
import { SlideEditor } from './SlideEditor'
import { ConfirmationDialog } from './ConfirmationDialog'

type SlideManagerProps = {
  slides: Slide[];
  onSave: (slide: Omit<Slide, 'id' | 'createdAt' | 'updatedAt'> | Slide) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function SlideManager({ slides, onSave, onDelete, onToggle }: SlideManagerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [deletingSlideId, setDeletingSlideId] = useState<string | null>(null)

  const handleSave = (slide: Omit<Slide, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSlide) {
      onSave({ ...editingSlide, ...slide });
    } else {
      onSave(slide);
    }
    setIsEditing(false)
    setEditingSlide(null)
  }

  const handleDelete = (id: string) => {
    setDeletingSlideId(id)
    setIsConfirmingDelete(true)
  }

  const confirmDelete = () => {
    if (deletingSlideId) {
      onDelete(deletingSlideId)
    }
    setIsConfirmingDelete(false)
    setDeletingSlideId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Slide Promosi</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSlide(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? 'Edit Slide' : 'Tambah Slide Baru'}
              </DialogTitle>
              <DialogDescription>
                Make changes to your slide here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <SlideEditor
              slide={editingSlide}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
              slides={slides}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <Card key={slide.id} className={`${!slide.isActive ? 'opacity-50' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{slide.title}</CardTitle>
                  <p className="text-sm text-slate-600 mb-1">{slide.subtitle}</p>
                  <Badge variant="secondary" className="mt-1">{slide.category}</Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(slide.id)}
                  >
                    {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingSlide(slide)
                      setIsEditing(true)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(slide.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`h-32 bg-gradient-to-br ${slide.backgroundColor} ${slide.textColor} rounded-lg p-4 mb-4`}>
                <h3 className="font-semibold mb-2">{slide.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{slide.subtitle}</p>
                <p className="text-sm opacity-90">{slide.description}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Fitur:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {slide.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ConfirmationDialog
        open={isConfirmingDelete}
        onOpenChange={setIsConfirmingDelete}
        onConfirm={confirmDelete}
        title="Anda yakin ingin menghapus slide ini?"
        description="Tindakan ini tidak dapat diurungkan. Slide akan dihapus secara permanen."
      />
    </div>
  )
}
