import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { InterestRate } from '@/lib/types'
import { RateEditor } from './RateEditor'
import { ConfirmationDialog } from './ConfirmationDialog'

type RateManagerProps = {
  rates: InterestRate[];
  onSave: (rate: InterestRate) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function RateManager({ rates, onSave, onDelete, onToggle }: RateManagerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingRate, setEditingRate] = useState<InterestRate | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [deletingRateId, setDeletingRateId] = useState<string | null>(null)

  const handleSave = (rate: InterestRate) => {
    onSave(rate)
    setIsEditing(false)
    setEditingRate(null)
  }

  const handleDelete = (id: string) => {
    setDeletingRateId(id)
    setIsConfirmingDelete(true)
  }

  const confirmDelete = () => {
    if (deletingRateId) {
      onDelete(deletingRateId)
    }
    setIsConfirmingDelete(false)
    setDeletingRateId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Suku Bunga</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRate(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Suku Bunga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRate ? 'Edit Suku Bunga' : 'Tambah Suku Bunga Baru'}
              </DialogTitle>
              <DialogDescription>
                Make changes to your rate here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <RateEditor
              rate={editingRate}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Jenis Produk</th>
                  <th className="text-left p-4 font-medium">Suku Bunga</th>
                  <th className="text-left p-4 font-medium">Periode</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id} className="border-b">
                    <td className="p-4">{rate.type}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="font-semibold">
                        {rate.rate}
                      </Badge>
                    </td>
                    <td className="p-4">{rate.period}</td>
                    <td className="p-4">
                      <Badge variant={rate.isActive ? "default" : "secondary"}>
                        {rate.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingRate(rate)
                            setIsEditing(true)
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(rate.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggle(rate.id)}
                        >
                          {rate.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <ConfirmationDialog
        open={isConfirmingDelete}
        onOpenChange={setIsConfirmingDelete}
        onConfirm={confirmDelete}
        title="Anda yakin ingin menghapus suku bunga ini?"
        description="Tindakan ini tidak dapat diurungkan. Suku bunga akan dihapus secara permanen."
      />
    </div>
  )
}
