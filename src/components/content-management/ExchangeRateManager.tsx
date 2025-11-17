import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { ExchangeRate } from '@/lib/types'
import { ExchangeRateEditor } from './ExchangeRateEditor'
import { ConfirmationDialog } from './ConfirmationDialog'

type ExchangeRateManagerProps = {
  exchangeRates: ExchangeRate[];
  onSave: (exchangeRate: Omit<ExchangeRate, 'id' | 'updatedAt'> | ExchangeRate) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function ExchangeRateManager({ exchangeRates, onSave, onDelete, onToggle }: ExchangeRateManagerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingExchangeRate, setEditingExchangeRate] = useState<ExchangeRate | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [deletingExchangeRateId, setDeletingExchangeRateId] = useState<string | null>(null)

  const handleSave = (exchangeRate: Omit<ExchangeRate, 'id' | 'updatedAt'>) => {
    if (editingExchangeRate) {
      onSave({ ...editingExchangeRate, ...exchangeRate });
    } else {
      onSave(exchangeRate);
    }
    setIsEditing(false)
    setEditingExchangeRate(null)
  }

  const handleDelete = (id: string) => {
    setDeletingExchangeRateId(id)
    setIsConfirmingDelete(true)
  }

  const confirmDelete = () => {
    if (deletingExchangeRateId) {
      onDelete(deletingExchangeRateId)
    }
    setIsConfirmingDelete(false)
    setDeletingExchangeRateId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kurs Mata Uang</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingExchangeRate(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kurs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingExchangeRate ? 'Edit Kurs' : 'Tambah Kurs Baru'}
              </DialogTitle>
              <DialogDescription>
                Make changes to your exchange rate here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ExchangeRateEditor
              exchangeRate={editingExchangeRate}
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
                  <th className="text-left p-4 font-medium">Mata Uang</th>
                  <th className="text-left p-4 font-medium">Kode</th>
                  <th className="text-left p-4 font-medium">Beli</th>
                  <th className="text-left p-4 font-medium">Jual</th>
                  <th className="text-left p-4 font-medium">Perubahan</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.map((rate) => (
                  <tr key={rate.id} className="border-b">
                    <td className="p-4 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      {rate.currency}
                    </td>
                    <td className="p-4 font-medium">{rate.code}</td>
                    <td className="p-4">{rate.buy.toLocaleString('id-ID')}</td>
                    <td className="p-4">{rate.sell.toLocaleString('id-ID')}</td>
                    <td className="p-4">
                      <div className={`flex items-center ${rate.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {rate.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {rate.change} ({rate.changePercent}%)
                      </div>
                    </td>
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
                            setEditingExchangeRate(rate)
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
        title="Anda yakin ingin menghapus kurs ini?"
        description="Tindakan ini tidak dapat diurungkan. Kurs akan dihapus secara permanen."
      />
    </div>
  )
}
