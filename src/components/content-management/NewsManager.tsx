import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { News } from '@/lib/types'
import { NewsEditor } from './NewsEditor'
import { ConfirmationDialog } from './ConfirmationDialog'

type NewsManagerProps = {
  news: News[];
  onSave: (newsItem: Omit<News, 'id' | 'createdAt' | 'updatedAt'> | News) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function NewsManager({ news, onSave, onDelete, onToggle }: NewsManagerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null)

  const handleSave = (newsItem: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNews) {
      onSave({ ...editingNews, ...newsItem });
    } else {
      onSave(newsItem);
    }
    setIsEditing(false)
    setEditingNews(null)
  }

  const handleDelete = (id: string) => {
    setDeletingNewsId(id)
    setIsConfirmingDelete(true)
  }

  const confirmDelete = () => {
    if (deletingNewsId) {
      onDelete(deletingNewsId)
    }
    setIsConfirmingDelete(false)
    setDeletingNewsId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Berita & Promo</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingNews(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
              </DialogTitle>
              <DialogDescription>
                Make changes to your news here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <NewsEditor
              newsItem={editingNews}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-sm text-slate-600">{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(item.id)}
                  >
                    {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingNews(item)
                      setIsEditing(true)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ConfirmationDialog
        open={isConfirmingDelete}
        onOpenChange={setIsConfirmingDelete}
        onConfirm={confirmDelete}
        title="Anda yakin ingin menghapus berita ini?"
        description="Tindakan ini tidak dapat diurungkan. Berita akan dihapus secara permanen."
      />
    </div>
  )
}
