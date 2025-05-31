import { Button, Modal, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TurnOnEvents, turnOnEvents } from "../../services/prices-service";

interface ActivateEventsModalProps {
  show: boolean;
  handleClose: () => void;
}

const schema = z.object({
  count: z.number().positive("O número de mensagens deve ser maior que zero"),
});

type FormData = z.infer<typeof schema>;

export default function ActivateEventsModal({ show, handleClose }: ActivateEventsModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TurnOnEvents) => {
      try {
        return await turnOnEvents(data)
      } catch (error) {
        alert("Erro ao ativar eventos");
        throw error;
      }
    },
    onSuccess: () => {
      alert("Eventos ativados com sucesso!");
    },
  });

  const handleActivate = handleSubmit((data) => {
    mutation.mutate(data);
    handleClose();
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ativar Eventos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNumMessages">
            <Form.Label>Número de Mensagens</Form.Label>
            <Form.Control
              type="number"
              placeholder="Informe o número de mensagens"
              {...register("count", { valueAsNumber: true })}
              isInvalid={!!errors.count}
            />
            <Form.Control.Feedback type="invalid">
              {errors.count?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleActivate}>
          Ativar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}