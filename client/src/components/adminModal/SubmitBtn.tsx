import { Button } from "@material-ui/core"

const SubmitBtn = () => {
   return <div style={{ textAlign: 'right' }}>
      <Button type="submit" variant='contained' color="primary" style={{ background: 'green' }} data-testid='submit btn'>Create</Button>
   </div>
}

export default SubmitBtn