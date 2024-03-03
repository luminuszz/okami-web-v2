import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'

import { Can } from './permissions-provider'
import { TelegramIcon } from './telegram-icon'
import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export function SyncTelegramPresentationDialog() {
  function handleCreateTelegramBotLink() {
    const link = `https://t.me/NotificationChapterBot?start`

    window.open(link, '_blank')
  }

  return (
    <Can I="show" a="telegram-button">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <TelegramIcon className="mr-2 size-4" fill="white" />
            Vincular Telegram
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receba Notificações no Telegram</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-2">
            <TelegramIcon className="size-20" fill="white" />
            <p className="text-md text-muted-foreground">
              Seja notificado assim que o status da sua obra mudar !
            </p>
          </div>
          <Button onClick={handleCreateTelegramBotLink}>
            <TelegramIcon className="mr-2 size-4" />
            Vincular telegram
          </Button>
        </DialogContent>
      </Dialog>
    </Can>
  )
}
